"use client";
import { type ChangeEvent, type FormEvent, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { CmsSiteSettings } from "@/cms/types";

type Stage = "mobile" | "otp" | "chat";
type Message = { id: number; who: "bot" | "user"; text: string };
const faqItems = [
  ["اعتبار تا چقدر است؟", "مشتریان واجد شرایط می‌توانند بسته به سرویس اعتباری، از اعتبارهای مختلف استفاده کنند. سقف و دوره بازپرداخت در هر سرویس متفاوت است."],
  ["چطور مرکز پیدا کنم؟", "از بخش جست‌وجو، نوع خدمت، استان و زمان موردنظر را انتخاب کنید تا مراکز و متخصصان مرتبط نمایش داده شوند."],
  ["پرداخت اعتباری چطور است؟", "بیوتی پی چند سرویس پرداخت اعتباری را یک‌جا نمایش می‌دهد تا در صورت واجد شرایط بودن، هزینه خدمت را با روش اعتباری پرداخت کنید."],
  ["ثبت‌نام پذیرنده", "برای شروع همکاری، وارد بخش «برای کسب‌وکارها» شوید و ثبت‌نام را انجام دهید. بعد از تکمیل اطلاعات، مراحل فعال‌سازی و آموزش انجام می‌شود."],
  ["پشتیبانی", "شماره پشتیبانی بله بیوتی پی ۰۹۳۰۶۹۶۰۰۶۵ است. راه‌های ارتباطی دیگر نیز در فوتر سایت نمایش داده می‌شوند."]
] as const;
const faToEn = (value: string) => value.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
const toFa = (value: string) => value.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export function AiAssistant({ settings }: { settings?: CmsSiteSettings }) {
  const ui = (key: string, fallback: string) => settings?.assistant_strings?.[key] || fallback;
  const configuredFaq = settings?.assistant_faq?.length ? settings.assistant_faq.map((x) => [x.question || "", x.answer || ""] as const) : faqItems;
  const welcome = settings?.assistant_welcome_messages?.length ? settings.assistant_welcome_messages : ["سلام! من دستیار هوشمند بیوتی پی هستم.", "برای شروع، لطفاً شماره موبایل‌تان را وارد کنید."];
  const [open, setOpen] = useState(false), [stage, setStage] = useState<Stage>("mobile"), [value, setValue] = useState(""), [otp, setOtp] = useState("");
  const [messages, setMessages] = useState<Message[]>(welcome.map((message, index) => ({ id: index + 1, who: "bot" as const, text: message })));
  const nextId = useRef(welcome.length + 1);
  const placeholder = stage === "mobile" ? ui("mobile_placeholder", "شماره موبایل را وارد کنید") : stage === "otp" ? ui("otp_placeholder", "کد ۴ رقمی را وارد کنید") : ui("chat_placeholder", "سوالتان را بنویسید…");
  const add = (text: string, who: Message["who"] = "bot") => setMessages((items) => [...items, { id: nextId.current++, who, text }]);
  const answer = (q: string) => { const hit = configuredFaq.find(([title]) => title === q || q.includes(title.split(" ")[0])); add(hit?.[1] ?? settings?.assistant_fallback_answer ?? "می‌توانید درباره اعتبار، پرداخت، ثبت‌نام پذیرنده و پشتیبانی سوال کنید."); };
  const submit = (event: FormEvent) => {
    event.preventDefault(); const raw = value.trim(); if (!raw) return;
    if (stage === "mobile") { const mobile = faToEn(raw).replace(/[^0-9+]/g, "").replace(/^\+98/, "0"); if (!/^09\d{9}$/.test(mobile)) { add(ui("invalid_mobile", "شماره موبایل معتبر وارد کنید؛ مثل ۰۹۱۲۱۲۳۴۵۶۷.")); return; } add(`${toFa(mobile.slice(0, 4))}•••${toFa(mobile.slice(-4))}`, "user"); const code = mobile.slice(-4); setOtp(code); setStage("otp"); setValue(""); add(`${ui("demo_code_prefix", "کد ورود آزمایشی شما:")} ${toFa(code)}`); return; }
    if (stage === "otp") { const code = faToEn(raw).replace(/\D/g, ""); add(toFa(code), "user"); setValue(""); if (code !== otp) { add(ui("invalid_otp", "کد واردشده درست نیست. همان کدی که بالاتر نمایش داده شده را وارد کنید.")); return; } setStage("chat"); add(ui("login_success", "ورود با موفقیت انجام شد. چه کمکی از دستم برمی‌آید؟")); return; }
    add(raw, "user"); setValue(""); answer(raw);
  };
  return <div className={`beautypay-ai-shell ${open ? "is-open" : ""}`}>
    <div className="beautypay-ai-panel" role="dialog" aria-label={ui("dialog_label", "مشاوره آنلاین بیوتی پی")} aria-hidden={!open}>
      <div className="beautypay-ai-head"><div className="beautypay-ai-head-row"><div className="beautypay-ai-mini-orb" aria-hidden="true"><Icon name="message" size={20} /></div><div className="beautypay-ai-head-copy"><strong>{settings?.assistant_title || "دستیار هوشمند بیوتی پی"}</strong><span>{settings?.assistant_subtitle || "آنلاین · پاسخ‌گوی سوالات متداول"}</span></div><button className="beautypay-ai-close" type="button" aria-label={ui("close_label", "بستن")} onClick={() => setOpen(false)}>×</button></div></div>
      <div className="beautypay-ai-messages" aria-live="polite">{messages.map((m) => <div key={m.id} className={`beautypay-ai-message ${m.who}`}><div className="beautypay-ai-bubble">{m.text}</div></div>)}{stage === "chat" && <div className="beautypay-ai-quick">{configuredFaq.map(([q]) => <button key={q} type="button" className="beautypay-ai-chip" onClick={() => { add(q, "user"); answer(q); }}>{q}</button>)}</div>}</div>
      <div className="beautypay-ai-composer"><form className="beautypay-ai-form" autoComplete="off" onSubmit={submit}><input className="beautypay-ai-input" type={stage === "chat" ? "text" : "tel"} inputMode={stage === "chat" ? "text" : "numeric"} aria-label={placeholder} placeholder={placeholder} value={value} maxLength={stage === "otp" ? 4 : undefined} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} /><button className="beautypay-ai-send" type="submit" aria-label={ui("send_label", "ارسال")}><Icon name="chevron" size={18} /></button></form><div className="beautypay-ai-note">{settings?.assistant_demo_note || "نسخه نمایشی · ورود و پاسخ‌ها در همین پنجره انجام می‌شود"}</div></div>
    </div>
    <button className="beautypay-ai-launcher" type="button" aria-label={ui("launcher_aria", "باز کردن مشاوره آنلاین")} aria-expanded={open} onClick={() => setOpen((v) => !v)}><span className="beautypay-ai-launcher-label">{settings?.assistant_launcher_label || "مشاوره آنلاین"}</span><span className="beautypay-ai-orb" aria-hidden="true"><Icon name="message" size={25} /><i className="beautypay-ai-online-dot" /></span></button>
  </div>;
}
