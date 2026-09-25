(() => {
  'use strict';
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const isPages = location.pathname.includes('/pages/');
  const root = isPages ? '../' : '';
  const icon=(name,size=20)=>{
    const paths={
      search:'<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.7-3.7"></path>',
      user:'<circle cx="12" cy="8" r="4"></circle><path d="M4 21c.8-4.3 3.6-6.5 8-6.5s7.2 2.2 8 6.5"></path>',
      heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"></path>',
      menu:'<path d="M4 6h16M4 12h16M4 18h16"></path>',
      map:'<path d="M9 18 3.5 21V6L9 3l6 3 5.5-3v15L15 21l-6-3zM9 3v15M15 6v15"></path>',
      home:'<path d="m3 11 9-8 9 8v10h-6v-6H9v6H3z"></path>',
      calendar:'<rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4M8 3v4M3 10h18"></path>',
      briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V4h8v3M3 12h18"></path>',
      gift:'<rect x="3" y="8" width="18" height="13" rx="2"></rect><path d="M12 8v13M3 12h18M12 8H8.8a2.8 2.8 0 1 1 2.2-4.5L12 5l1-1.5A2.8 2.8 0 1 1 15.2 8H12z"></path>',
      chevron:'<path d="m9 18 6-6-6-6"></path>',
      pin:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0z"></path><circle cx="12" cy="10" r="2.5"></circle>',
      clock:'<circle cx="12" cy="12" r="9"></circle><path d="M12 7v6l4 2"></path>',
      phone:'<path d="M7 3h10v18H7z"></path><path d="M10 6h4M11 18h2"></path>',
      star:'<path d="m12 2 3 6 6.5 1-4.7 4.6 1.1 6.4-5.9-3.1L6.1 20l1.1-6.4L2.5 9 9 8z"></path>',
      card:'<rect x="2.5" y="5" width="19" height="14" rx="2"></rect><path d="M2.5 10h19M7 15h3"></path>',
      chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"></path>',
      message:'<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"></path>'
    };
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.star}</svg>`
  };
  window.fIcon=icon;
  const faDigits='۰۱۲۳۴۵۶۷۸۹';
  const toFa=v=>String(v).replace(/\d/g,d=>faDigits[d]);
  $$('.fa-num').forEach(el=>{el.textContent=toFa(el.textContent)});

  function buildHeader(){
    const host=$('[data-site-header]'); if(!host) return;
    const business=document.body.dataset.header==='business';
    host.innerHTML=`<header class="site-header ${business?'business-header':''}"><div class="container-xl px-3"><div class="inner">
      <a class="brand" href="${root}index.html" aria-label="بیوتی پی"><img class="brand-logo" src="${root}assets/images/${business?'beautypay-white.svg':'beautypay-color.svg'}" alt="بیوتی پی" width="523" height="159"></a>
      <nav class="desktop-nav d-flex align-items-center gap-1">
        ${business?`<div class="nav-drop"><a class="nav-linkish" href="${root}pages/features.html">امکانات</a><div class="dropdown-panel">
          <a class="drop-item" href="${root}pages/features.html">${icon('calendar',18)}<span><strong>نوبت‌دهی و تقویم</strong><small>رزرو ۲۴/۷ و یادآوری</small></span></a>
          <a class="drop-item" href="${root}pages/payments.html">${icon('card',18)}<span><strong>پرداخت</strong><small>پرداخت آنلاین و حضوری</small></span></a></div></div>
          <a class="nav-linkish" href="${root}pages/payments.html">پرداخت اعتباری <small lang="en">BNPL</small></a><a class="nav-linkish" href="${root}pages/pos.html">کارتخوان</a>
          <a class="nav-linkish" href="${root}pages/accelerate.html">کمپین رشد</a>
          <a class="nav-linkish" href="${root}pages/connect.html">دایرکت هوشمند · Connect</a>
          <a class="nav-linkish" href="${root}pages/events.html">رویدادها</a>
          <a class="nav-linkish" href="${root}pages/commission.html">کارمزد</a><a class="nav-linkish" href="${root}pages/suppliers.html">تأمین‌کنندگان</a>`:
          `<a class="nav-linkish" href="${root}pages/shop.html">فروشگاه</a><a class="nav-linkish" href="${root}pages/app.html">اپلیکیشن</a>`}
      </nav>
      <div class="nav-actions">
        <a class="nav-linkish mobile-context-switch" href="${business?root+'index.html':root+'pages/business.html'}">${business?'برای مشتریان':'برای کسب‌وکارها'}</a>
        ${business?`<a class="nav-linkish hide-tablet" href="${root}index.html">برای مشتریان</a><button class="btn-f btn-f-light hide-tablet" type="button" data-login>ورود</button><a class="btn-f btn-f-${business?'light':'dark'} nav-primary-cta" href="${root}pages/commission.html">شروع کنید</a>`:
        `<a class="nav-linkish hide-tablet" href="${root}pages/business.html">برای کسب‌وکارها</a><button class="btn-f btn-f-light" type="button" data-login>ورود</button>`}
        <button class="icon-btn hamburger" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-label="منو">${icon('menu')}</button>
      </div></div></div></header>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="mobileMenu" dir="rtl"><div class="offcanvas-header"><a class="brand" href="${root}index.html" aria-label="بیوتی پی"><img class="brand-logo" src="${root}assets/images/beautypay-color.svg" alt="بیوتی پی" width="523" height="159"></a><button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="بستن"></button></div><div class="offcanvas-body">
      <div class="d-grid gap-2">${business?`<a class="nav-linkish" href="${root}pages/business.html">خانه کسب‌وکار</a><a class="nav-linkish" href="${root}pages/features.html">امکانات</a><a class="nav-linkish" href="${root}pages/payments.html">پرداخت اعتباری · BNPL</a><a class="nav-linkish" href="${root}pages/pos.html">کارتخوان</a><a class="nav-linkish" href="${root}pages/accelerate.html">کمپین رشد</a><a class="nav-linkish" href="${root}pages/connect.html">دایرکت هوشمند · Connect</a><a class="nav-linkish" href="${root}pages/events.html">رویدادها</a><a class="nav-linkish" href="${root}pages/commission.html">کارمزد</a><a class="nav-linkish" href="${root}pages/suppliers.html">تأمین‌کنندگان</a><a class="nav-linkish" href="${root}index.html">برای مشتریان</a>`:`<a class="nav-linkish" href="${root}index.html">خانه</a><a class="nav-linkish" href="${root}pages/search.html">جست‌وجو</a><a class="nav-linkish" href="${root}pages/shop.html">فروشگاه</a><a class="nav-linkish" href="${root}pages/app.html">اپلیکیشن</a><a class="nav-linkish" href="${root}pages/business.html">برای کسب‌وکارها</a>`}</div></div></div>`;
  }
  function buildFooter(){
    const host=$('[data-site-footer]'); if(!host)return;
    const appLinks=`<div class="footer-store-download">
      <div class="footer-app-label">دانلود اپلیکیشن از استورهای معتبر</div>
      <div class="footer-store-badges">
        <a class="footer-store-badge" href="${root}pages/app.html" aria-label="دانلود اپلیکیشن بیوتی پی از App Store"><img src="${root}assets/images/stores/app-store.svg" alt="App Store" width="130" height="40" loading="lazy" decoding="async"></a>
        <a class="footer-store-badge" href="${root}pages/app.html" aria-label="دانلود اپلیکیشن بیوتی پی از Google Play"><img src="${root}assets/images/stores/google-play.svg" alt="Google Play" width="130" height="40" loading="lazy" decoding="async"></a>
      </div>
    </div>`;

    const footerContacts={
      callCenter:'۰۲۱۸۲۸۰۸۵۹۰',
      callCenterHref:'tel:02182808590',
      balePhone:'۰۹۳۰۶۹۶۰۰۶۵',
      balePhoneHref:'tel:09306960065',
      baleId:'https://ble.ir/beautypaysupport',
      baleIdHref:'https://ble.ir/beautypaysupport',
      whatsappId:'+989306960065',
      whatsappIdHref:'https://wa.me/989306960065',
      telegramId:'@beautypaypro',
      telegramIdHref:'https://t.me/beautypaypro'
    };
    const contactValue=(value,href='')=>href
      ? `<a class="footer-contact-value" href="${href}"><bdi>${value}</bdi></a>`
      : `<span class="footer-contact-value${value==='—'?' is-empty':''}"><bdi>${value}</bdi></span>`;

    host.innerHTML=`<footer class="footer"><div class="container-xl px-3"><div class="footer-grid"><div><a class="brand mb-3 footer-brand" href="${root}index.html" aria-label="بیوتی پی"><img class="brand-logo" src="${root}assets/images/beautypay-white.svg" alt="بیوتی پی" width="523" height="159"></a><div class="footer-about-copy text-white-50"><p>پلتفرم یکپارچه کشف، مقایسه، رزرو، پرداخت اعتباری و مدیریت خدمات سلامت، زیبایی، تندرستی و دندانپزشکی.</p><p>کاربران می‌توانند خدمات موردنظر خود را پیدا، مقایسه و رزرو کرده و هزینه را نقدی، آنلاین یا اقساطی پرداخت کنند. کسب‌وکارها نیز به ابزارهای مدیریت نوبت، مشتری، پرداخت، بازاریابی و افزایش فروش دسترسی دارند.</p><p>یک تجربه یکپارچه از «کشف تا دریافت خدمت و پرداخت».</p></div>${appLinks}</div><div><h6>برای مشتریان</h6><a href="${root}pages/search.html">پیدا کردن مرکز</a><a href="${root}pages/app.html">معرفی اپلیکیشن</a><a href="${root}pages/shop.html">فروشگاه</a><a href="${root}pages/help.html">راهنما</a></div><div><h6>برای کسب‌وکارها</h6><a href="${root}pages/business.html">معرفی پلتفرم</a><a href="${root}pages/features.html">امکانات</a><a href="${root}pages/accelerate.html">کمپین رشد</a><a href="${root}pages/connect.html">دایرکت هوشمند · Connect</a><a href="${root}pages/commission.html">کارمزد</a><a href="${root}pages/events.html">رویدادها</a><a href="${root}pages/payments.html">پرداخت اعتباری · BNPL</a><a href="${root}pages/pos.html">کارتخوان</a><a href="${root}pages/suppliers.html">تأمین‌کنندگان</a></div><div><h6>کشف بیشتر</h6><a href="${root}pages/marketplace.html">مارکت‌پلیس</a><a href="${root}pages/blog.html">مجله</a><a href="${root}pages/about.html">درباره ما</a><a href="${root}pages/careers.html">فرصت‌های شغلی</a></div><div><h6>حوزه‌های خدمات</h6><a href="${root}pages/search.html?cat=health">سلامت</a><a href="${root}pages/search.html?cat=beauty">زیبایی</a><a href="${root}pages/search.html?cat=wellness">تندرستی</a><a href="${root}pages/search.html?cat=dental">دندانپزشکی</a></div></div>

      <section class="footer-support-section" aria-labelledby="footer-support-title">
        <div class="footer-section-heading"><div><div class="footer-kicker">ارتباط با بیوتی پی</div><h6 id="footer-support-title">مرکز تماس و پشتیبانی</h6></div><p>راه‌های ارتباطی رسمی برای پاسخ‌گویی و پشتیبانی کاربران و پذیرندگان.</p></div>
        <div class="footer-contact-grid">
          <div class="footer-contact-card"><span>شماره مرکز تماس</span>${contactValue(footerContacts.callCenter,footerContacts.callCenterHref)}</div>
          <div class="footer-contact-card"><span>شماره پشتیبانی بله</span>${contactValue(footerContacts.balePhone,footerContacts.balePhoneHref)}</div>
          <div class="footer-contact-card"><span>آی‌دی پشتیبانی بله</span>${contactValue(footerContacts.baleId,footerContacts.baleIdHref)}</div>
          <div class="footer-contact-card"><span>آی‌دی پشتیبانی واتساپ</span>${contactValue(footerContacts.whatsappId,footerContacts.whatsappIdHref)}</div>
          <div class="footer-contact-card"><span>آی‌دی پشتیبانی تلگرام</span>${contactValue(footerContacts.telegramId,footerContacts.telegramIdHref)}</div>
        </div>
      </section>

      <section class="footer-social-section" aria-labelledby="footer-social-title">
        <div class="footer-section-heading footer-social-heading"><div><div class="footer-kicker">شبکه‌های اجتماعی</div><h6 id="footer-social-title">بیوتی پی را دنبال کنید</h6></div></div>
        <div class="rules-page-wrapper order-0 order-md-1">
          <ul class="list-inline rules-page">
          <li class="list-inline-item rule-page">
          <a href="https://www.instagram.com/beautypay.pro/">
          <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H16C17.0609 4 18.0783 4.42143 18.8284 5.17157C19.5786 5.92172 20 6.93913 20 8V16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20H8C6.93913 20 5.92172 19.5786 5.17157 18.8284C4.42143 18.0783 4 17.0609 4 16V8Z" stroke="#253035" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12Z" stroke="#253035" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.5 7.5V7.51" stroke="#253035" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </span>
          </a>
          </li>
          <li class="list-inline-item rule-page"><a href="#"><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.5 11.0181V16.0181" stroke="#253035" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 16.0181V13.1014C12 11.9505 12.8951 11.0181 14 11.0181C15.1049 11.0181 16 11.9505 16 13.1014V16.0181" stroke="#253035" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.499 8.29307C8.375 8.29307 8.274 8.39407 8.275 8.51807C8.275 8.64207 8.376 8.74307 8.5 8.74307C8.624 8.74307 8.725 8.64207 8.725 8.51807C8.725 8.39307 8.624 8.29307 8.499 8.29307" stroke="#253035" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4H16C17.0609 4 18.0783 4.42143 18.8284 5.17157C19.5786 5.92172 20 6.93913 20 8V16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20H8C6.93913 20 5.92172 19.5786 5.17157 18.8284C4.42143 18.0783 4 17.0609 4 16V8Z" stroke="#253035" stroke-linecap="round" stroke-linejoin="round"/></svg></span></a></li>
          <li class="list-inline-item rule-page"><a href="#"><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 5.01807L15.2664 19.0181H19L8.73363 5.01807H5Z" stroke="#253035" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 19.0181L10.922 13.0961M13.0745 10.9436L19 5.01807" stroke="#253035" stroke-linecap="round" stroke-linejoin="round"/></svg></span></a></li>
          <li class="list-inline-item rule-page"><a href="#"><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9839 16.108L10.9189 18.117C10.5609 18.465 9.96192 18.311 9.81692 17.833L8.44092 13.303" stroke="#253035" stroke-linecap="round" stroke-linejoin="round"/><path d="M15.2928 10.1289C15.2928 10.1289 12.7038 12.4649 11.3758 13.6639C10.9788 14.0219 11.0118 14.6519 11.4418 14.9689L16.8198 18.9419C17.3488 19.3329 18.1048 19.0459 18.2418 18.4019L20.8828 5.95489C21.0108 5.35289 20.4198 4.84989 19.8458 5.07089L4.3308 11.0549C3.8738 11.2309 3.8958 11.8839 4.3628 12.0299L8.4398 13.3019" stroke="#253035" stroke-linecap="round" stroke-linejoin="round"/></svg></span></a></li>
          <li class="list-inline-item rule-page"><a href="#"><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12.2365" cy="11.9977" r="7.6984" stroke="#253035"/><circle cx="13.0863" cy="15.2074" r="1.125" transform="rotate(-15 13.0863 15.2074)" stroke="#253035"/><circle cx="8.95254" cy="12.8212" r="1.125" transform="rotate(35 8.95254 12.8212)" stroke="#253035"/><circle cx="11.3388" cy="8.68734" r="1.125" transform="rotate(-15 11.3388 8.68734)" stroke="#253035"/><circle cx="15.4726" cy="11.0741" r="1.125" transform="rotate(35 15.4726 11.0741)" stroke="#253035"/><path d="M21.6686 9.04323C22.1281 7.32816 21.1103 5.56528 19.3952 5.10573M5.10638 4.60541C5.56594 2.89034 7.32881 1.87254 9.04388 2.33209M4.60606 18.8943C2.89099 18.4347 1.87319 16.6718 2.33275 14.9568M18.8949 19.3946C18.4354 21.1097 16.6725 22.1275 14.9574 21.6679" stroke="#253035" stroke-linecap="round"/></svg></span></a></li>
          <li class="list-inline-item rule-page"><a href="#"><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 8.51807C3 7.58981 3.37928 6.69957 4.05442 6.04319C4.72955 5.38682 5.64522 5.01807 6.6 5.01807H17.4C18.3548 5.01807 19.2705 5.38682 19.9456 6.04319C20.6207 6.69957 21 7.58981 21 8.51807V15.5181C21 16.4463 20.6207 17.3366 19.9456 17.9929C19.2705 18.6493 18.3548 19.0181 17.4 19.0181H6.6C5.64522 19.0181 4.72955 18.6493 4.05442 17.9929C3.37928 17.3366 3 16.4463 3 15.5181V8.51807Z" stroke="#253035" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 9L15 12L10 15V9Z" stroke="#253035" stroke-linecap="round" stroke-linejoin="round"/></svg></span></a></li>
          </ul>
          <div class="white-space-24 d-block d-md-none"></div>
        </div>
      </section>

      <div class="footer-bottom"><span>© ۲۰۲۶ بیوتی پی — همه حقوق برای شرکت ژینا ویرا آرای نو محفوظ است.</span><nav class="footer-legal-links" aria-label="قوانین و راهنماهای حقوقی"><a href="${root}pages/terms.html">قوانین استفاده</a><a href="${root}pages/financial-terms.html">قوانین پرداخت و همکاری</a><a href="${root}pages/safe-choice.html">راهنمای انتخاب امن</a><a href="${root}pages/disclaimer.html">سلب مسئولیت</a></nav></div></div></footer>`;

    $$('.footer-social-section a[href="#"]',host).forEach(a=>{a.setAttribute('aria-disabled','true');a.addEventListener('click',e=>e.preventDefault())});
  }

  function buildMobileBottom(){
    const host=$('[data-mobile-bottom]'); if(!host)return;
    const p=document.body.dataset.page||'';
    const isBusiness=document.body.dataset.header==='business';
    host.innerHTML=`<nav class="mobile-bottom" aria-label="منوی اصلی موبایل">
      <a class="${p==='home'?'active':''}" href="${root}index.html">${icon('home',19)}<span>خانه</span></a>
      <a class="${p==='search'?'active':''}" href="${root}pages/search.html">${icon('search',19)}<span>جستجو</span></a>
      <a class="${isBusiness?'active':''}" href="${root}pages/business.html">${icon('briefcase',19)}<span>کسب و کار</span></a>
      <a class="${p==='help'?'active':''}" href="${root}pages/help.html">${icon('message',19)}<span>پشتیبانی</span></a>
    </nav>`;
  }

  function buildAiAssistant(){
    if($('.beautypay-ai-shell')) return;
    const host=document.createElement('div');
    host.className='beautypay-ai-shell';
    host.innerHTML=`
      <div class="beautypay-ai-panel" role="dialog" aria-label="مشاوره آنلاین بیوتی پی" aria-hidden="true">
        <div class="beautypay-ai-head">
          <div class="beautypay-ai-head-row">
            <div class="beautypay-ai-mini-orb" aria-hidden="true">${icon('message',20)}</div>
            <div class="beautypay-ai-head-copy"><strong>دستیار هوشمند بیوتی پی</strong><span>آنلاین · پاسخ‌گوی سوالات متداول</span></div>
            <button class="beautypay-ai-close" type="button" aria-label="بستن">×</button>
          </div>
        </div>
        <div class="beautypay-ai-messages" aria-live="polite"></div>
        <div class="beautypay-ai-composer">
          <form class="beautypay-ai-form" autocomplete="off">
            <input class="beautypay-ai-input" type="tel" inputmode="numeric" aria-label="شماره موبایل" placeholder="شماره موبایل را وارد کنید">
            <button class="beautypay-ai-send" type="submit" aria-label="ارسال">${icon('chevron',18)}</button>
          </form>
          <div class="beautypay-ai-note">نسخه نمایشی · کد ورود داخل همین پنجره نمایش داده می‌شود</div>
        </div>
      </div>
      <button class="beautypay-ai-launcher" type="button" aria-label="باز کردن مشاوره آنلاین" aria-expanded="false">
        <span class="beautypay-ai-launcher-label">مشاوره آنلاین</span>
        <span class="beautypay-ai-orb" aria-hidden="true">${icon('message',25)}<i class="beautypay-ai-online-dot"></i></span>
      </button>`;
    document.body.appendChild(host);

    const panel=$('.beautypay-ai-panel',host), launcher=$('.beautypay-ai-launcher',host), close=$('.beautypay-ai-close',host);
    const messages=$('.beautypay-ai-messages',host), form=$('.beautypay-ai-form',host), input=$('.beautypay-ai-input',host);
    let stage='mobile', demoCode='';
    const faToEn=v=>String(v).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d));
    const normalizeMobile=v=>{
      let n=faToEn(v).replace(/[^0-9+]/g,'');
      if(n.startsWith('+98')) n='0'+n.slice(3);
      if(n.startsWith('0098')) n='0'+n.slice(4);
      if(n.startsWith('98') && n.length===12) n='0'+n.slice(2);
      return n;
    };
    const maskMobile=n=>n.length===11?`${toFa(n.slice(0,4))}•••${toFa(n.slice(-4))}`:toFa(n);
    const scrollEnd=()=>requestAnimationFrame(()=>{messages.scrollTop=messages.scrollHeight});
    const addMsg=(text,who='bot')=>{
      const row=document.createElement('div');row.className=`beautypay-ai-message ${who}`;
      const bubble=document.createElement('div');bubble.className='beautypay-ai-bubble';bubble.textContent=text;
      row.appendChild(bubble);messages.appendChild(row);scrollEnd();
    };
    const showCode=code=>{
      const card=document.createElement('div');card.className='beautypay-ai-code-card';
      card.innerHTML=`<small>کد ورود آزمایشی شما</small><strong>${toFa(code)}</strong>`;
      messages.appendChild(card);scrollEnd();
    };
    const faqItems=[
      ['اعتبار تا چقدر است؟','مشتریان واجد شرایط می‌توانند بسته به سرویس اعتباری، از اعتبارهای مختلف استفاده کنند. سقف و دوره بازپرداخت در هر سرویس متفاوت است.'],
      ['چطور مرکز پیدا کنم؟','از بخش جست‌وجو، نوع خدمت، استان و زمان موردنظر را انتخاب کنید تا مراکز و متخصصان مرتبط نمایش داده شوند.'],
      ['پرداخت اعتباری چطور است؟','بیوتی پی چند سرویس پرداخت اعتباری را یک‌جا نمایش می‌دهد تا در صورت واجد شرایط بودن، هزینه خدمت را با روش اعتباری پرداخت کنید.'],
      ['چه سرویس‌هایی دارید؟','در نسخه فعلی سایت، دیماپی، اسنپ‌پی، دیجی‌پی، وایب، تارا، کیپا، ازکی‌وام و ملت در بخش سرویس‌های پرداخت اعتباری نمایش داده می‌شوند.'],
      ['ثبت‌نام پذیرنده','برای شروع همکاری، وارد بخش «برای کسب‌وکارها» شوید و ثبت‌نام را انجام دهید. بعد از تکمیل اطلاعات، مراحل فعال‌سازی و آموزش انجام می‌شود.'],
      ['تسویه پذیرنده','زمان و شرایط تسویه به سرویس پرداخت انتخابی و قرارداد پذیرنده بستگی دارد. جزئیات دقیق در پنل و قرارداد هر سرویس نمایش داده می‌شود.'],
      ['پشتیبانی','شماره پشتیبانی بله بیوتی پی ۰۹۳۰۶۹۶۰۰۶۵ است. راه‌های ارتباطی دیگر نیز در فوتر سایت نمایش داده می‌شوند.']
    ];
    const showFaqs=()=>{
      const wrap=document.createElement('div');wrap.className='beautypay-ai-quick';
      faqItems.forEach(([q])=>{const b=document.createElement('button');b.type='button';b.className='beautypay-ai-chip';b.textContent=q;b.dataset.faq=q;wrap.appendChild(b)});
      messages.appendChild(wrap);scrollEnd();
    };
    const answerFaq=q=>{
      const text=faToEn(q).trim();
      const low=text.toLowerCase();
      let hit=faqItems.find(([title])=>title===q);
      if(!hit){
        if(/اعتبار|سقف|قسط/.test(low)) hit=faqItems[0];
        else if(/پیدا|جست|مرکز|پزشک|سالن|کلینیک/.test(low)) hit=faqItems[1];
        else if(/پرداخت|bnpl|اعتباری/.test(low)) hit=faqItems[2];
        else if(/سرویس|دیما|اسنپ|دیجی|وایب|تارا|کیپا|ازکی|ملت/.test(low)) hit=faqItems[3];
        else if(/ثبت|پذیرنده|کسب.?و.?کار|همکاری/.test(low)) hit=faqItems[4];
        else if(/تسویه|واریز/.test(low)) hit=faqItems[5];
        else if(/پشتیبانی|تماس|بله|واتس|تلگرام/.test(low)) hit=faqItems[6];
      }
      addMsg(hit?hit[1]:'این نسخه فعلاً به سوالات متداول بیوتی پی پاسخ می‌دهد. یکی از موضوع‌های پیشنهادی را انتخاب کنید یا درباره اعتبار، پرداخت، ثبت‌نام پذیرنده، تسویه و پشتیبانی بپرسید.');
      showFaqs();
    };
    const welcome=()=>{
      stage='chat';input.type='text';input.inputMode='text';input.placeholder='سوالتان را بنویسید…';input.setAttribute('aria-label','پیام به دستیار بیوتی پی');
      addMsg('خوش آمدید! ورود شما با موفقیت انجام شد. من برای پاسخ به سوالات متداول بیوتی پی اینجا هستم.');
      addMsg('چه کمکی از دستم برمی‌آید؟');showFaqs();
    };
    const open=()=>{
      host.classList.add('is-open');panel.setAttribute('aria-hidden','false');launcher.setAttribute('aria-expanded','true');
      if(!messages.children.length){addMsg('سلام! من دستیار هوشمند بیوتی پی هستم.');addMsg('برای شروع، لطفاً شماره موبایل‌تان را وارد کنید.');}
      setTimeout(()=>input.focus(),160);
    };
    const shut=()=>{host.classList.remove('is-open');panel.setAttribute('aria-hidden','true');launcher.setAttribute('aria-expanded','false');launcher.focus()};
    launcher.addEventListener('click',()=>host.classList.contains('is-open')?shut():open());
    close.addEventListener('click',shut);
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&host.classList.contains('is-open'))shut()});
    messages.addEventListener('click',e=>{const b=e.target.closest('[data-faq]');if(!b)return;addMsg(b.dataset.faq,'user');answerFaq(b.dataset.faq)});
    form.addEventListener('submit',e=>{
      e.preventDefault();const raw=input.value.trim();if(!raw)return;
      if(stage==='mobile'){
        const mobile=normalizeMobile(raw);
        if(!/^09\d{9}$/.test(mobile)){addMsg('شماره موبایل معتبر وارد کنید؛ مثل ۰۹۱۲۱۲۳۴۵۶۷.');input.select();return;}
        addMsg(maskMobile(mobile),'user');
        demoCode=String(Math.floor(1000+Math.random()*9000));stage='otp';
        addMsg('یک کد ورود برای شما ساخته شد. کد زیر را وارد کنید:');showCode(demoCode);
        input.value='';input.placeholder='کد ۴ رقمی را وارد کنید';input.setAttribute('aria-label','کد ورود چهار رقمی');input.maxLength=4;input.focus();return;
      }
      if(stage==='otp'){
        const code=faToEn(raw).replace(/\D/g,'');addMsg(toFa(code),'user');input.value='';
        if(code!==demoCode){addMsg('کد واردشده درست نیست. همان کدی که بالاتر نمایش داده شده را وارد کنید.');return;}
        input.removeAttribute('maxlength');welcome();return;
      }
      addMsg(raw,'user');input.value='';answerFaq(raw);
    });
  }
  function markActiveNavigation(){
    const currentPath=new URL(location.href).pathname.replace(/\/$/,'/index.html');
    $$('a[href]').forEach(link=>{
      const raw=link.getAttribute('href');
      if(!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return;
      const target=new URL(link.href,location.href);
      if(target.origin!==location.origin) return;
      const targetPath=target.pathname.replace(/\/$/,'/index.html');
      if(targetPath!==currentPath) return;
      link.classList.add('is-active');
      link.setAttribute('aria-current','page');
    });
  }

  buildHeader();
  buildFooter();
  buildMobileBottom();
  buildAiAssistant();
  markActiveNavigation();

  // VibeFarsi-inspired Spotlight: pointer-following light reveals a masked grid.
  function initSpotlights(){
    $$('.hero,.biz-hero,.app-hero,.fx-hero,.pos-hero,.shop-hero,.sup-hero,.sup-detail-hero').forEach(section=>{
      section.classList.add('beautypay-unified-hero');
      if(section.dataset.spotlightReady) return;
      section.dataset.spotlightReady='1';
      section.classList.add('has-spotlight');
      const bg=document.createElement('div');
      bg.className='spotlight-bg';
      bg.setAttribute('aria-hidden','true');
      const grid=document.createElement('div');
      grid.className='spotlight-grid';
      bg.appendChild(grid);
      section.prepend(bg);
      let pointerFrame=0;
      let pointerX=0;
      let pointerY=0;
      const move=()=>{
        pointerFrame=0;
        const r=section.getBoundingClientRect();
        const x=Math.max(0,Math.min(100,((pointerX-r.left)/r.width)*100));
        const y=Math.max(0,Math.min(100,((pointerY-r.top)/r.height)*100));
        section.style.setProperty('--spot-x',x+'%');
        section.style.setProperty('--spot-y',y+'%');
      };
      section.addEventListener('pointermove',e=>{
        pointerX=e.clientX;
        pointerY=e.clientY;
        if(!pointerFrame) pointerFrame=requestAnimationFrame(move);
      },{passive:true});
      section.addEventListener('pointerleave',()=>{
        if(pointerFrame){cancelAnimationFrame(pointerFrame);pointerFrame=0}
        section.style.setProperty('--spot-x','50%');
        section.style.setProperty('--spot-y','40%');
      },{passive:true});
    });
  }

  initSpotlights();

  // Fresha-style horizontal venue carousels on the consumer home page
  $$('[data-carousel]').forEach(track=>{
    const key=track.dataset.carousel;
    const next=$(`[data-carousel-next="${key}"]`);
    const prev=$(`[data-carousel-prev="${key}"]`);
    const amount=()=>Math.min(920,Math.max(280,track.clientWidth*.72));
    next?.addEventListener('click',()=>track.scrollBy({left:-amount(),behavior:'smooth'}));
    prev?.addEventListener('click',()=>track.scrollBy({left:amount(),behavior:'smooth'}));
  });
  const provinceTrack=$('[data-province-scroll]');
  $('.province-next')?.addEventListener('click',()=>provinceTrack?.scrollBy({left:-520,behavior:'smooth'}));
  $('.province-prev')?.addEventListener('click',()=>provinceTrack?.scrollBy({left:520,behavior:'smooth'}));

  // generic login modal
  const modal=document.createElement('div');modal.className='modal fade';modal.id='loginModal';modal.tabIndex=-1;modal.setAttribute('aria-labelledby','loginModalTitle');modal.innerHTML=`<div class="modal-dialog modal-dialog-centered"><div class="modal-content login-modal-content"><div class="modal-header border-0"><h5 class="modal-title fw-bold" id="loginModalTitle">ورود یا ساخت حساب</h5><button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="بستن"></button></div><div class="modal-body"><label class="form-label" for="loginMobile">شماره موبایل</label><input class="form-control" id="loginMobile" name="mobile" inputmode="tel" autocomplete="tel" placeholder="۰۹۱۲۱۲۳۴۵۶۷"><button class="btn-f btn-f-dark w-100 mt-3" type="button" data-login-submit>ادامه</button><p class="small text-muted text-center mt-3">با ادامه، قوانین استفاده و حریم خصوصی را می‌پذیرید.</p></div></div></div>`;document.body.appendChild(modal);
  $$('[data-login]').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();bootstrap.Modal.getOrCreateInstance(modal).show()}));
  $('[data-login-submit]')?.addEventListener('click',()=>{bootstrap.Modal.getOrCreateInstance(modal).hide();toast('کد ورود برای شما ارسال شد.')});

  function toast(msg){let t=$('.toast-f');if(!t){t=document.createElement('div');t.className='toast-f';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)};window.fToast=toast;

  // search navigation
  $$('[data-search-form]').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();
    const params=new URLSearchParams();
    const q=$('[name=q]',form)?.value.trim();
    const province=$('[name=location]',form)?.value.trim();
    const date=$('[name=date]',form)?.value.trim();
    if(q)params.set('q',q);
    if(province)params.set('location',province);
    if(date)params.set('date',date);
    location.href=`/search${params.toString()?'?'+params.toString():''}`;
  }));
  $$('[data-search-button]').forEach(btn=>btn.addEventListener('click',()=>location.href='/search'));
  $$('.chip[data-category]').forEach(c=>c.addEventListener('click',()=>location.href=`/search?cat=${encodeURIComponent(c.dataset.category)}`));

  // Interactive homepage search pickers: services, provinces and Persian date.
  const homeSearch=$('.search-shell[data-search-form]');
  if(homeSearch){
    const pickers=$$('[data-search-picker]',homeSearch);
    const closePickers=except=>pickers.forEach(p=>{
      if(p===except)return;
      const input=$('input',p),popover=$('.search-popover',p);
      if(popover)popover.hidden=true;
      if(input)input.setAttribute('aria-expanded','false');
    });
    const openPicker=picker=>{
      closePickers(picker);
      const input=$('input',picker),popover=$('.search-popover',picker);
      if(!input||!popover)return;
      popover.hidden=false;
      input.setAttribute('aria-expanded','true');
    };
    pickers.forEach(picker=>{
      const input=$('input',picker),popover=$('.search-popover',picker);
      if(!input||!popover)return;
      input.addEventListener('click',()=>openPicker(picker));
      input.addEventListener('focus',()=>openPicker(picker));
      $$('[data-search-option]',popover).forEach(option=>option.addEventListener('click',()=>{
        input.value=option.dataset.searchOption||option.textContent.trim();
        $$('[data-search-option]',popover).forEach(x=>x.classList.toggle('is-selected',x===option));
        closePickers();
      }));
    });
    const serviceInput=$('[data-search-picker="service"] input',homeSearch);
    serviceInput?.addEventListener('input',()=>{
      const picker=serviceInput.closest('[data-search-picker]');
      openPicker(picker);
      const query=serviceInput.value.trim();
      $$('[data-search-option]',picker).forEach(option=>{option.hidden=!!query&&!option.textContent.includes(query)});
    });
    const calendar=$('[data-persian-calendar-days]',homeSearch);
    const dateInput=$('[data-search-picker="date"] input',homeSearch);
    const selectPersianDay=day=>{
      if(!dateInput)return;
      dateInput.value=day===31?'امروز ۳۱ شهریور ۱۴۰۵':`${toFa(day)} شهریور ۱۴۰۵`;
      $$('.calendar-days button',homeSearch).forEach(button=>button.classList.toggle('is-selected',Number(button.dataset.day)===day));
      closePickers();
    };
    if(calendar){
      const blank=document.createElement('span');blank.className='calendar-empty';blank.setAttribute('aria-hidden','true');calendar.append(blank);
      for(let day=1;day<=31;day++){
        const button=document.createElement('button');button.type='button';button.dataset.day=String(day);button.textContent=toFa(day);button.setAttribute('aria-label',`${toFa(day)} شهریور ۱۴۰۵`);
        if(day===31){button.classList.add('is-today','is-selected');button.setAttribute('aria-current','date')}
        button.addEventListener('click',()=>selectPersianDay(day));calendar.append(button);
      }
    }
    $('[data-calendar-today]',homeSearch)?.addEventListener('click',()=>selectPersianDay(31));
    document.addEventListener('click',event=>{if(!homeSearch.contains(event.target))closePickers()});
    document.addEventListener('keydown',event=>{if(event.key==='Escape')closePickers()});
  }

  // business hero sector carousel: soft fade between the four core verticals
  const businessHeroRotate=$('[data-business-hero-rotate]');
  if(businessHeroRotate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const businessHeroWords=['سلامت','زیبایی','تندرستی','دندانپزشکی'];
    let businessHeroWordIndex=0;
    window.setInterval(()=>{
      businessHeroRotate.classList.add('is-fading');
      window.setTimeout(()=>{
        businessHeroWordIndex=(businessHeroWordIndex+1)%businessHeroWords.length;
        businessHeroRotate.textContent=businessHeroWords[businessHeroWordIndex];
        businessHeroRotate.classList.remove('is-fading');
      },360);
    },2600);
  }

  // rotating hero service category: سلامت / زیبایی / تندرستی / دندانپزشکی
  const heroRotate=$('[data-hero-rotate]');
  if(heroRotate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const words=['سلامت','زیبایی','تندرستی','دندانپزشکی'];
    let heroWordIndex=0;
    window.setInterval(()=>{
      heroRotate.classList.add('is-fading');
      window.setTimeout(()=>{
        heroWordIndex=(heroWordIndex+1)%words.length;
        heroRotate.textContent=words[heroWordIndex];
        heroRotate.classList.remove('is-fading');
      },420);
    },2400);
  }



  // Floating header: fixed on every page, with a stronger floating state while scrolling.
  const floatingHeader=$('.site-header');
  if(floatingHeader){
    let headerFrame=0;
    const syncHeaderState=()=>{
      headerFrame=0;
      floatingHeader.classList.toggle('is-scrolled',window.scrollY>18);
    };
    syncHeaderState();
    window.addEventListener('scroll',()=>{
      if(!headerFrame) headerFrame=requestAnimationFrame(syncHeaderState);
    },{passive:true});
  }

  // Front-end live booking counter for the customer homepage.
  // It persists for the current local day. Replace this block with a real bookings API when available.
  const liveBookingEl=$('[data-live-bookings]');
  if(liveBookingEl){
    const baseCount=589556;
    const now=new Date();
    const dayKey=`beautypay-live-bookings-${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
    const formatFaNumber=n=>new Intl.NumberFormat('fa-IR').format(n);
    let state;
    try{state=JSON.parse(localStorage.getItem(dayKey)||'null')}catch{state=null}
    if(!state||!Number.isFinite(state.count)||!Number.isFinite(state.updatedAt)){
      state={count:baseCount,updatedAt:Date.now()};
    }else{
      // Catch up modestly after time spent away, while keeping this clearly a front-end demo counter.
      const awaySeconds=Math.max(0,Math.floor((Date.now()-state.updatedAt)/1000));
      state.count+=Math.min(240,Math.floor(awaySeconds/18));
      state.updatedAt=Date.now();
    }
    const paint=()=>{liveBookingEl.textContent=formatFaNumber(state.count)};
    const persist=()=>{state.updatedAt=Date.now();try{localStorage.setItem(dayKey,JSON.stringify(state))}catch{}};
    const tick=()=>{
      state.count+=Math.random()<.2?2:1;
      paint();persist();
      window.setTimeout(tick,2200+Math.floor(Math.random()*3600));
    };
    paint();persist();
    window.setTimeout(tick,1600+Math.floor(Math.random()*1800));
  }

  // favourites
  document.addEventListener('click',e=>{const b=e.target.closest('.heart');if(!b)return;e.preventDefault();b.classList.toggle('active');b.setAttribute('aria-pressed',String(b.classList.contains('active')));toast(b.classList.contains('active')?'به علاقه‌مندی‌ها اضافه شد':'از علاقه‌مندی‌ها حذف شد')});

  // search page state, sorting and filters
  const urlParams=new URLSearchParams(location.search);
  const searchInput=$('[data-search-form] [name=q]');
  if(searchInput && urlParams.get('q')) searchInput.value=urlParams.get('q');
  const category=urlParams.get('cat');
  if(category){const target=$(`.filter-btn[data-filter="${CSS.escape(category)}"]`);if(target)target.classList.add('active');}
  $$('.filter-btn').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.static!==undefined)return;b.classList.toggle('active');filterResults()}));
  function filterResults(){
    const active=$$('.filter-btn.active').map(x=>x.dataset.filter).filter(Boolean);
    const maxPrice=+$('[data-price-range]')?.value||Infinity;
    const minRating=+$('[data-rating-filter]')?.value||0;
    $$('.result-card').forEach(r=>{
      const tags=(r.dataset.tags||'').split(',');
      const tagOk=active.length===0||active.some(a=>tags.includes(a));
      const priceOk=(+r.dataset.price||0)<=maxPrice;
      const ratingOk=(+r.dataset.rating||0)>=minRating;
      r.hidden=!(tagOk&&priceOk&&ratingOk);
    });
    const count=$$('.result-card').filter(r=>!r.hidden).length;
    const counter=$('[data-result-count]');
    if(counter) counter.textContent=toFa(count)+' نتیجه';
  }
  if(category) filterResults();
  $('[data-map-toggle]')?.addEventListener('click',()=>{$('.map-col')?.classList.toggle('show');$('[data-map-toggle]').innerHTML=$('.map-col')?.classList.contains('show')?'نمایش فهرست':'نمایش نقشه'});
  $('[data-sort]')?.addEventListener('change',e=>{const list=$('[data-results]');if(!list)return;const cards=$$('.result-card',list);if(e.target.value==='rating')cards.sort((a,b)=>+b.dataset.rating-+a.dataset.rating);if(e.target.value==='price')cards.sort((a,b)=>+a.dataset.price-+b.dataset.price);cards.forEach(c=>list.appendChild(c));});
  $('[data-price-range]')?.addEventListener('input',e=>{const out=$('[data-price-value]');if(out)out.textContent=toFa(Number(e.target.value).toLocaleString('en-US'))+' هزار تومان'});
  $('[data-apply-advanced-filter]')?.addEventListener('click',()=>{filterResults();toast('فیلترها اعمال شد')});
  $('[data-clear-advanced-filter]')?.addEventListener('click',()=>{const pr=$('[data-price-range]');if(pr)pr.value=3000;const rr=$('[data-rating-filter]');if(rr)rr.value='0';const out=$('[data-price-value]');if(out)out.textContent='۳٬۰۰۰ هزار تومان';filterResults();toast('فیلترهای پیشرفته پاک شد')});

  // booking interactions
  $$('.pro-choice').forEach(p=>p.addEventListener('click',()=>{$$('.pro-choice').forEach(x=>x.classList.remove('selected'));p.classList.add('selected');toast('متخصص انتخاب شد')}));
  $$('.cal-grid button:not([disabled])').forEach(b=>b.addEventListener('click',()=>{$$('.cal-grid button').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('[data-date-label]')&&($('[data-date-label]').textContent='تاریخ انتخابی: '+b.textContent+' مهر')}));
  $$('.time-grid button').forEach(b=>b.addEventListener('click',()=>{
    $$('.time-grid button').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    const label=$('[data-time-label]');
    if(label) label.textContent='ساعت: '+b.textContent;
  }));
  $('[data-book-confirm]')?.addEventListener('click',()=>{const m=$('#confirmModal');if(m)bootstrap.Modal.getOrCreateInstance(m).show();else toast('رزرو شما ثبت شد')});
  $('[data-booking-success]')?.addEventListener('click',()=>toast('رزرو با موفقیت ثبت شد'));

  // price toggle
  $('[data-price-toggle]')?.addEventListener('change',e=>{$$('[data-monthly]').forEach(el=>el.textContent=e.target.checked?el.dataset.annual:el.dataset.monthly);toast(e.target.checked?'نمایش پرداخت سالانه':'نمایش پرداخت ماهانه')});

  // gift amount
  $$('[data-gift-amount]').forEach(b=>b.addEventListener('click',()=>{$$('[data-gift-amount]').forEach(x=>x.classList.remove('active'));b.classList.add('active');$$('[data-gift-value]').forEach(el=>el.textContent=b.textContent)}));

  // working demo forms and modal flows
  const completeForm=(form,msg)=>{form.addEventListener('submit',e=>{e.preventDefault();if(!form.checkValidity()){form.reportValidity();return;}const m=form.closest('.modal');if(m)bootstrap.Modal.getOrCreateInstance(m).hide();toast(msg);form.reset();});};
  $$('[data-support-form]').forEach(f=>completeForm(f,'درخواست پشتیبانی ثبت شد.'));
  $$('[data-trial-form]').forEach(f=>completeForm(f,'حساب آزمایشی شما آماده شد.'));
  $$('[data-sales-form]').forEach(f=>completeForm(f,'درخواست تماس فروش ثبت شد.'));
  $$('[data-application-form]').forEach(f=>completeForm(f,'درخواست همکاری ثبت شد.'));
  $$('[data-gift-payment-form]').forEach(f=>completeForm(f,'پرداخت نمایشی با موفقیت انجام شد.'));
  $$('[data-trial-plan]').forEach(b=>b.addEventListener('click',()=>{const el=$('[data-selected-plan]');if(el)el.textContent='— '+b.dataset.trialPlan;}));
  $('[data-gift-checkout]')?.addEventListener('click',()=>{const wrap=$('[data-gift-form]');const required=wrap?$$('[required]',wrap):[];const invalid=required.find(el=>!el.checkValidity());if(invalid){invalid.reportValidity();invalid.focus();return;}const value=$('[data-gift-value]')?.textContent||'';const out=$('[data-gift-checkout-value]');if(out)out.textContent=value;const m=$('#giftCheckoutModal');if(m)bootstrap.Modal.getOrCreateInstance(m).show();});
  $('[data-demo-play]')?.addEventListener('click',e=>{e.currentTarget.textContent=e.currentTarget.textContent==='▶'?'Ⅱ':'▶';toast(e.currentTarget.textContent==='Ⅱ'?'دموی محصول در حال پخش است':'دمو متوقف شد')});
  $('[data-share-page]')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);toast('لینک صفحه کپی شد')}catch{toast('لینک آماده اشتراک‌گذاری است')}});


  // gift request page interactions
  const giftRequestInputs=$$('[data-gift-card-count]');
  const giftMixList=$('[data-gift-mix-list]');
  const giftTotalCount=$('[data-gift-total-count]');
  const giftRemainingCount=$('[data-gift-remaining-count]');
  const giftSubmitButton=$('[data-gift-request-submit]');
  const giftRequestForm=$('[data-gift-request-form]');
  const giftCardLabels={10:'۱۰ میلیون تومان',20:'۲۰ میلیون تومان',30:'۳۰ میلیون تومان',50:'۵۰ میلیون تومان',100:'۱۰۰ میلیون تومان'};
  const readGiftTotals=()=>giftRequestInputs.reduce((sum,input)=>sum+Math.max(0,parseInt(input.value||'0',10)||0),0);
  const updateGiftSummary=()=>{
    if(!giftRequestInputs.length) return;
    const rows=[];
    giftRequestInputs.forEach(input=>{
      const count=Math.max(0,parseInt(input.value||'0',10)||0);
      const amount=input.dataset.giftCardCount;
      if(count>0) rows.push({label:giftCardLabels[amount]||amount,value:count});
    });
    const total=readGiftTotals();
    const remaining=Math.max(0,1000-total);
    if(giftTotalCount) giftTotalCount.textContent=toFa(total)+' کارت';
    if(giftRemainingCount) giftRemainingCount.textContent=toFa(remaining);
    if(giftSubmitButton) giftSubmitButton.disabled=total!==1000;
    if(giftMixList){
      if(!rows.length){giftMixList.innerHTML='<div class="gift-summary-item"><span class="gift-summary-label">هنوز ترکیبی ثبت نشده</span><strong>۰</strong></div>'}
      else{giftMixList.innerHTML=rows.map(row=>`<div class="gift-summary-item"><span class="gift-summary-label">${row.label}</span><strong>${toFa(row.value)}</strong></div>`).join('')}
    }
  };
  giftRequestInputs.forEach(input=>input.addEventListener('input',()=>{
    if((parseInt(input.value||'0',10)||0)<0) input.value='0';
    updateGiftSummary();
  }));
  giftRequestForm?.addEventListener('submit',e=>{
    e.preventDefault();
    if(!giftRequestForm.checkValidity()){
      giftRequestForm.reportValidity();
      return;
    }
    const total=readGiftTotals();
    if(total!==1000){
      toast('ترکیب کارت‌های انتخابی باید دقیقاً ۱٬۰۰۰ عدد باشد.');
      return;
    }
    toast('درخواست ۱٬۰۰۰ کارت اعتباری ثبت شد. کارشناس ما طی ۲۴ ساعت کاری با شما تماس می‌گیرد.');
    giftRequestForm.reset();
    updateGiftSummary();
  });
  updateGiftSummary();

  // help-center search
  $('[data-help-search]')?.addEventListener('submit',e=>{e.preventDefault();const q=($('[name=helpq]',e.currentTarget)?.value||'').trim().toLowerCase();let n=0;$$('[data-help-text]').forEach(card=>{const match=!q||(card.dataset.helpText||'').toLowerCase().includes(q);card.hidden=!match;if(match)n++;});toast(toFa(n)+' دسته مرتبط پیدا شد');});

  // query-driven detail pages keep static HTML useful when opened directly
  const articleMap={
    'fill-empty-slots':['چطور ظرفیت خالی مطب، کلینیک، سالن یا مرکز را سریع‌تر پر کنیم؟','نوبت خالی فقط یک خانه خالی در تقویم نیست؛ ظرفیت فروشی است که اگر در زمان مناسب دیده شود، می‌تواند به رزرو تبدیل شود.',root+'assets/images/photoreal/management.webp'],
    'pricing-services':['قیمت‌گذاری خدمات بدون پیچیدگی','قیمت خوب باید هم هزینه و ظرفیت شما را پوشش دهد و هم برای مشتری قابل فهم و قابل مقایسه باشد.',root+'assets/images/photoreal/payment.webp'],
    'loyal-clients':['ساخت تجربه بهتر برای مشتریان وفادار','وفاداری از شناخت مشتری، تجربه ثابت و زمان‌بندی درست برای رزرو بعدی ساخته می‌شود.',root+'assets/images/photoreal/loyalty.webp'],
    'weekly-reports':['گزارش‌هایی که مدیر مرکز خدماتی باید هر هفته ببیند','چند شاخص ساده می‌تواند نشان دهد فروش، ظرفیت تیم و بازگشت مشتری در چه جهتی حرکت می‌کند.',root+'assets/images/photoreal/analytics.webp'],
    'reduce-cancellations':['کاهش کنسلی با سیاست پرداخت درست','بیعانه، یادآوری و سیاست شفاف کنسلی می‌توانند برنامه روزانه را پایدارتر کنند.',root+'assets/images/photoreal/payment.webp'],
    'portfolio-to-booking':['نمونه‌کار آنلاین؛ از عکس تا رزرو','عکس‌های منظم، توضیح دقیق خدمت و پروفایل متخصص، فاصله بین مشاهده و رزرو را کوتاه می‌کنند.',root+'assets/images/photoreal/mobile.webp']
  };
  const article=articleMap[urlParams.get('article')];if(article){const t=$('[data-article-title]'),l=$('[data-article-lead]'),i=$('[data-article-image]');if(t)t.textContent=article[0];if(l)l.textContent=article[1];if(i){i.src=article[2];i.alt=article[0]}document.title=article[0]+' — بیوتی پی';}
  const helpTitles={'calendar':'تقویم و برنامه‌ریزی','payments':'فروش و تسویه','clients':'مدیریت مشتریان','team':'مدیریت تیم','services':'مدیریت خدمات','online-presence':'حضور آنلاین','team-shifts':'مدیریت شیفت اعضای تیم','email-campaign':'ساخت کمپین ایمیلی','smart-pricing':'مدیریت قیمت‌گذاری هوشمند','add-team-member':'افزودن عضو جدید به فضای کاری'};
  if(helpTitles[urlParams.get('topic')]){const h=$('[data-help-title]');if(h)h.textContent=helpTitles[urlParams.get('topic')];document.title=helpTitles[urlParams.get('topic')]+' — مرکز راهنما';}
  const careerTitles={'senior-product-designer':'Senior Product Designer','frontend-engineer':'Frontend Engineer','customer-success':'Customer Success Specialist'};
  if(careerTitles[urlParams.get('role')]){const h=$('[data-career-title]');if(h)h.textContent=careerTitles[urlParams.get('role')];document.title=careerTitles[urlParams.get('role')]+' — بیوتی پی';}

  // scroll reveals
  const io=new IntersectionObserver(entries=>entries.forEach(en=>{if(en.isIntersecting){en.target.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:500,easing:'ease-out',fill:'both'});io.unobserve(en.target)}}),{threshold:.1});$$('[data-reveal]').forEach(el=>io.observe(el));
})();
