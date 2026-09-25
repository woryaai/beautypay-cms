(() => {
  'use strict';

  const fa = new Intl.NumberFormat('fa-IR');
  const money = value => `${fa.format(value)} تومان`;
  const q = (s, c=document) => c.querySelector(s);
  const qa = (s, c=document) => [...c.querySelectorAll(s)];
  const root = '/';
  const img = name => `${root}assets/images/shop/${name}`;
  const providerLogo = id => `${root}assets/images/payment-providers/${id}.svg`;

  const providerDefs = [
    {id:'dimapay', name:'دیماپی', count:4, note:'۴ قسط'},
    {id:'snapppay', name:'اسنپ‌پی', count:4, note:'۴ قسط'},
    {id:'digipay', name:'دیجی‌پی', count:4, note:'۴ قسط'},
    {id:'tara', name:'تارا', count:3, note:'۳ قسط'},
    {id:'keepa', name:'کیپا', count:4, note:'۴ قسط'},
    {id:'vibe', name:'وایب', count:4, note:'۴ قسط'},
    {id:'azkivam', name:'ازکی‌وام', count:6, note:'تا ۶ قسط'},
    {id:'mellat', name:'ملت', count:12, note:'تا ۱۲ قسط'}
  ];

  const products = [
    {
      id:'p1', category:'beauty', title:'ژل شست‌وشوی ملایم صورت ۲۵۰ میلی‌لیتر', brand:'Dermia', country:'فرانسه', image:'cleanser.webp',
      price:895000, oldPrice:1090000, stock:23, unit:'۲۵۰ ml', weight:'۲۹۰ گرم', rating:4.8, reviews:186,
      tags:['پوست حساس','مصرف روزانه'], delivery:'امروز تا ۲ روز کاری',
      description:'پاک‌کننده روزانه با بافت سبک برای روتین مراقبت پوست. مناسب استفاده در صبح و شب و قابل استفاده پیش از محصولات مراقبتی دیگر.',
      usage:['صورت را با آب ولرم مرطوب کنید.','مقدار کمی از محصول را ۳۰ تا ۶۰ ثانیه به‌آرامی ماساژ دهید.','با آب بشویید و پوست را بدون کشیدن خشک کنید.'],
      warning:'در صورت بروز تحریک پوستی مصرف را متوقف کنید. از تماس مستقیم با چشم خودداری شود.',
      specs:{'نوع محصول':'شوینده صورت','کشور سازنده':'فرانسه','حجم':'۲۵۰ میلی‌لیتر','نوع پوست':'نرمال تا حساس','بافت':'ژل','دفعات مصرف':'۱ تا ۲ بار در روز'}
    },
    {
      id:'p2', category:'beauty', title:'ضدآفتاب فلوئید SPF50 حجم ۵۰ میلی‌لیتر', brand:'Solaire Lab', country:'ایتالیا', image:'sunscreen.webp',
      price:1240000, oldPrice:1480000, stock:12, unit:'۵۰ ml', weight:'۷۵ گرم', rating:4.9, reviews:241,
      tags:['SPF50','بافت سبک'], delivery:'۱ تا ۳ روز کاری',
      description:'فلوئید سبک برای استفاده روزانه روی پوست صورت و گردن، با طراحی مناسب برای قرار گرفتن در روتین صبحگاهی.',
      usage:['روی پوست تمیز و خشک استفاده کنید.','۱۵ دقیقه پیش از قرار گرفتن در فضای باز مقدار کافی بزنید.','در صورت نیاز و به‌ویژه پس از تعریق یا شست‌وشو تمدید کنید.'],
      warning:'ضدآفتاب به‌تنهایی جایگزین سایر روش‌های محافظت در برابر نور خورشید نیست.',
      specs:{'نوع محصول':'فلوئید ضدآفتاب','کشور سازنده':'ایتالیا','حجم':'۵۰ میلی‌لیتر','SPF':'۵۰','فینیش':'سبک','نوع مصرف':'روزانه'}
    },
    {
      id:'p3', category:'daily', title:'کرم مرطوب‌کننده روزانه ۱۰۰ میلی‌لیتر', brand:'BeautyPay Select', country:'ایران', image:'cream.webp',
      price:540000, oldPrice:650000, stock:41, unit:'۱۰۰ ml', weight:'۱۳۰ گرم', rating:4.7, reviews:112,
      tags:['روزانه','پوست خشک'], delivery:'ارسال امروز',
      description:'مرطوب‌کننده ساده و کاربردی برای استفاده روزمره روی دست و صورت با بسته‌بندی مناسب مصرف خانگی.',
      usage:['روی پوست تمیز مقدار کمی استفاده کنید.','تا جذب کامل به‌آرامی ماساژ دهید.','در طول روز در صورت نیاز تکرار کنید.'],
      warning:'برای مصرف خارجی است. دور از دسترس کودکان نگهداری شود.',
      specs:{'نوع محصول':'کرم مرطوب‌کننده','کشور سازنده':'ایران','حجم':'۱۰۰ میلی‌لیتر','نوع پوست':'خشک و نرمال','بسته‌بندی':'کاسه‌ای','کاربرد':'روزانه'}
    },
    {
      id:'p4', category:'beauty', title:'سرم مراقبت پوست ۳۰ میلی‌لیتر', brand:'Nuvia', country:'کره جنوبی', image:'serum.webp',
      price:1580000, oldPrice:1890000, stock:8, unit:'۳۰ ml', weight:'۶۰ گرم', rating:4.8, reviews:95,
      tags:['روتین شب','قطره‌ای'], delivery:'۱ تا ۳ روز کاری',
      description:'سرم سبک برای تکمیل روتین مراقبت پوست با بسته‌بندی قطره‌چکان و مناسب استفاده کنترل‌شده.',
      usage:['۲ تا ۳ قطره روی پوست تمیز استفاده کنید.','با نوک انگشت پخش کنید و از مالش شدید بپرهیزید.','پس از جذب، مرطوب‌کننده مناسب استفاده شود.'],
      warning:'پیش از مصرف روی کل صورت، تست موضعی انجام شود. از تماس با چشم خودداری کنید.',
      specs:{'نوع محصول':'سرم صورت','کشور سازنده':'کره جنوبی','حجم':'۳۰ میلی‌لیتر','بسته‌بندی':'قطره‌چکان','زمان پیشنهادی':'شب','وزن':'۶۰ گرم'}
    },
    {
      id:'p5', category:'health', title:'فشارسنج بازویی دیجیتال خانگی', brand:'NavaCare', country:'آلمان', image:'bp-monitor.webp',
      price:4890000, oldPrice:5490000, stock:6, unit:'۱ دستگاه', weight:'۴۸۰ گرم', rating:4.9, reviews:319,
      tags:['خانگی','دیجیتال'], delivery:'ارسال فوری تا ۲ روز',
      description:'فشارسنج بازویی دیجیتال برای پایش خانگی فشار خون با نمایشگر خوانا و حافظه ثبت اندازه‌گیری‌های اخیر.',
      usage:['۵ دقیقه پیش از اندازه‌گیری در حالت نشسته استراحت کنید.','کاف را مطابق راهنمای دستگاه روی بازو ببندید.','اندازه‌گیری را در وضعیت ثابت انجام دهید و نتایج را ثبت کنید.'],
      warning:'این ابزار برای پایش خانگی است و جایگزین تشخیص یا توصیه پزشک نیست. در نتایج غیرعادی با پزشک مشورت کنید.',
      specs:{'نوع محصول':'فشارسنج بازویی','کشور سازنده':'آلمان','منبع تغذیه':'باتری/آداپتور','حافظه':'۲ کاربر','وزن دستگاه':'۴۸۰ گرم','گارانتی':'۱۸ ماه'}
    },
    {
      id:'p6', category:'dental', title:'مسواک برقی شارژی با ۳ حالت تمیزکنندگی', brand:'Oralis', country:'هلند', image:'toothbrush.webp',
      price:3290000, oldPrice:3690000, stock:18, unit:'۱ دستگاه', weight:'۲۲۰ گرم', rating:4.8, reviews:274,
      tags:['شارژی','۳ حالت'], delivery:'۱ تا ۲ روز کاری',
      description:'مسواک برقی شارژی با طراحی مینیمال، تایمر داخلی و سه حالت استفاده برای مراقبت روزانه دهان و دندان.',
      usage:['خمیر دندان را روی سری مرطوب قرار دهید.','مسواک را به‌آرامی روی سطوح دندان حرکت دهید و فشار زیاد وارد نکنید.','پس از استفاده سری را آبکشی و خشک کنید.'],
      warning:'برای کودکان یا افراد دارای درمان‌های خاص دندانپزشکی، روش استفاده را با دندانپزشک هماهنگ کنید.',
      specs:{'نوع محصول':'مسواک برقی','کشور سازنده':'هلند','حالت‌ها':'۳ حالت','شارژدهی':'تا ۱۴ روز','اقلام همراه':'کابل + سری','گارانتی':'۱۲ ماه'}
    },
    {
      id:'p7', category:'wellness', title:'مت یوگا و تمرین ضدلغزش ۶ میلی‌متر', brand:'Mellow Move', country:'ترکیه', image:'yoga-mat.webp',
      price:1790000, oldPrice:2150000, stock:35, unit:'۱ عدد', weight:'۹۵۰ گرم', rating:4.7, reviews:148,
      tags:['ورزش','ضدلغزش'], delivery:'ارسال امروز',
      description:'مت سبک برای یوگا، کشش و تمرین‌های خانگی با ضخامت ۶ میلی‌متر و قابلیت جمع‌شدن آسان.',
      usage:['روی سطح صاف و خشک باز کنید.','پس از تمرین با دستمال مرطوب تمیز کنید.','پیش از رول‌کردن اجازه دهید کاملاً خشک شود.'],
      warning:'روی سطوح خیس استفاده نشود و از تماس طولانی با منابع حرارتی مستقیم دور نگه داشته شود.',
      specs:{'نوع محصول':'مت تمرین','کشور سازنده':'ترکیه','ضخامت':'۶ میلی‌متر','طول':'۱۸۳ سانتی‌متر','عرض':'۶۱ سانتی‌متر','وزن':'۹۵۰ گرم'}
    },
    {
      id:'p8', category:'daily', title:'ست حوله مراقبتی نرم ۳ تکه', brand:'Soft Daily', country:'ایران', image:'towels.webp',
      price:780000, oldPrice:930000, stock:27, unit:'۳ تکه', weight:'۷۲۰ گرم', rating:4.6, reviews:84,
      tags:['بهداشت روزانه','۳ تکه'], delivery:'۱ تا ۳ روز کاری',
      description:'ست حوله سه‌تکه برای استفاده شخصی و روزانه با بافت نرم و رنگ خنثی مناسب حمام، ورزش و مراقبت پوست.',
      usage:['پیش از اولین استفاده شست‌وشو شود.','برای حفظ بافت، از شوینده ملایم استفاده کنید.','پس از هر بار استفاده کاملاً خشک شود.'],
      warning:'دستور شست‌وشوی روی لیبل محصول رعایت شود.',
      specs:{'نوع محصول':'ست حوله','کشور سازنده':'ایران','تعداد':'۳ تکه','جنس':'پنبه ترکیبی','وزن':'۷۲۰ گرم','رنگ':'سبز خنثی'}
    },
    {
      id:'p9', category:'wellness', title:'شیکر و قمقمه ورزشی ۷۰۰ میلی‌لیتر', brand:'VitaFlow', country:'امارات', image:'nutrition.webp',
      price:690000, oldPrice:790000, stock:52, unit:'۷۰۰ ml', weight:'۱۸۰ گرم', rating:4.7, reviews:132,
      tags:['ورزش','روزانه'], delivery:'ارسال امروز',
      description:'قمقمه سبک برای آب و نوشیدنی‌های ورزشی، مناسب باشگاه، محل کار و استفاده روزمره.',
      usage:['پیش از اولین استفاده شست‌وشو شود.','درپوش را پس از پر کردن کاملاً ببندید.','پس از استفاده شست‌وشو و در حالت باز خشک کنید.'],
      warning:'برای مایعات بسیار داغ مناسب نیست.',
      specs:{'نوع محصول':'قمقمه ورزشی','کشور سازنده':'امارات','حجم':'۷۰۰ میلی‌لیتر','جنس':'پلاستیک بدون BPA','وزن':'۱۸۰ گرم','کاربرد':'ورزش و روزانه'}
    },
    {
      id:'p10', category:'wellness', title:'روغن ماساژ بدن ۲۰۰ میلی‌لیتر', brand:'Calm Ritual', country:'ایران', image:'wellness.webp',
      price:620000, oldPrice:740000, stock:16, unit:'۲۰۰ ml', weight:'۲۳۰ گرم', rating:4.8, reviews:76,
      tags:['ماساژ','آرامش'], delivery:'۱ تا ۲ روز کاری',
      description:'روغن ماساژ بدن برای استفاده در روتین آرامش و مراقبت شخصی با بافت روان و مناسب ماساژ دستی.',
      usage:['مقدار کمی در کف دست گرم کنید.','با فشار ملایم روی پوست ماساژ دهید.','پس از استفاده دست‌ها را بشویید.'],
      warning:'روی پوست آسیب‌دیده استفاده نشود. در صورت حساسیت، مصرف قطع شود.',
      specs:{'نوع محصول':'روغن ماساژ','کشور سازنده':'ایران','حجم':'۲۰۰ میلی‌لیتر','بافت':'روغنی سبک','کاربرد':'بدن','بسته‌بندی':'بطری'}
    },
    {
      id:'p11', category:'dental', title:'پک مراقبت روزانه دهان و دندان', brand:'Oralis', country:'ایران', image:'dental-care.webp',
      price:980000, oldPrice:1180000, stock:20, unit:'۱ پک', weight:'۳۴۰ گرم', rating:4.8, reviews:203,
      tags:['پک کامل','روزانه'], delivery:'۱ تا ۲ روز کاری',
      description:'پک کاربردی مراقبت روزانه دهان و دندان شامل اقلام عمومی بهداشت دهان برای استفاده خانگی.',
      usage:['هر قلم را مطابق دستور درج‌شده روی بسته‌بندی استفاده کنید.','بهداشت روزانه دهان را به‌صورت منظم انجام دهید.','سری و اقلام شخصی را مشترک استفاده نکنید.'],
      warning:'در صورت داشتن درمان دندانپزشکی فعال، استفاده از محصولات خاص را با دندانپزشک هماهنگ کنید.',
      specs:{'نوع محصول':'پک بهداشت دهان','کشور سازنده':'ایران','تعداد اقلام':'۴ قلم','مناسب':'بزرگسال','وزن':'۳۴۰ گرم','مصرف':'روزانه'}
    },
    {
      id:'p12', category:'health', title:'کیف مراقبت و پایش سلامت خانگی', brand:'NavaCare', country:'ایران', image:'healthcare.webp',
      price:2490000, oldPrice:2790000, stock:10, unit:'۱ پک', weight:'۶۵۰ گرم', rating:4.7, reviews:67,
      tags:['خانه','سفر'], delivery:'۲ تا ۴ روز کاری',
      description:'کیف سازمان‌دهی اقلام مراقبت و پایش سلامت برای خانه یا سفر، با بخش‌بندی داخلی و طراحی قابل حمل.',
      usage:['اقلام شخصی مورد نیاز را در بخش‌های جدا قرار دهید.','کیف را در محیط خشک و دور از گرمای مستقیم نگهداری کنید.','پس از هر سفر محتویات و تاریخ مصرف اقلام را بازبینی کنید.'],
      warning:'این محصول شامل داروی نسخه‌ای نیست. اقلام پزشکی را مطابق شرایط نگهداری خود محصول نگهداری کنید.',
      specs:{'نوع محصول':'کیف مراقبت','کشور سازنده':'ایران','ابعاد':'۲۸×۲۰×۱۲ سانتی‌متر','وزن':'۶۵۰ گرم','جنس':'پارچه مقاوم','کاربرد':'خانه و سفر'}
    }
  ];

  const state = {
    category:'all',
    search:'',
    sort:'featured',
    inStock:false,
    installment:false,
    favorites:new Set(JSON.parse(localStorage.getItem('beautypayShopFavs') || '[]')),
    cart:JSON.parse(localStorage.getItem('beautypayShopCart') || '{}')
  };

  function getProduct(id){ return products.find(p => p.id === id); }
  function discount(p){ return Math.round((1 - p.price/p.oldPrice)*100); }
  function monthly(p, count=4){ return Math.ceil(p.price/count/1000)*1000; }
  function totalCartItems(){ return Object.values(state.cart).reduce((s,n)=>s+n,0); }
  function cartSubtotal(){ return Object.entries(state.cart).reduce((s,[id,n]) => s + (getProduct(id)?.price||0)*n, 0); }
  function shippingCost(){ const t=cartSubtotal(); return t===0?0:(t>=1500000?0:85000); }
  function persistCart(){ localStorage.setItem('beautypayShopCart', JSON.stringify(state.cart)); }
  function persistFavs(){ localStorage.setItem('beautypayShopFavs', JSON.stringify([...state.favorites])); }

  function productCard(p){
    const low = p.stock <= 8;
    return `<article class="shop-product-card" data-product-id="${p.id}">
      <div class="shop-product-media" data-open-product="${p.id}">
        <span class="shop-badge ${discount(p)>=15?'sale':low?'low':''}">${discount(p)>=15?`${fa.format(discount(p))}٪ تخفیف`:low?'موجودی محدود':'پیشنهاد'}</span>
        <button class="shop-like ${state.favorites.has(p.id)?'active':''}" type="button" data-fav="${p.id}" aria-label="افزودن به علاقه‌مندی" aria-pressed="${String(state.favorites.has(p.id))}">${state.favorites.has(p.id)?'♥':'♡'}</button>
        <img src="${img(p.image)}" loading="lazy" decoding="async" alt="${p.title}" width="800" height="800">
      </div>
      <div class="shop-product-body">
        <div class="shop-product-brand">${p.brand} · ${p.country}</div>
        <h3 class="shop-product-title"><button class="shop-product-title-action" type="button" data-open-product="${p.id}" aria-label="مشاهده ${p.title}">${p.title}</button></h3>
        <div class="shop-rating"><span class="star">★</span><strong>${fa.format(p.rating)}</strong><span>(${fa.format(p.reviews)} نظر)</span><span class="shop-stock ${low?'low':''}">${low?`فقط ${fa.format(p.stock)} عدد`: 'موجود'}</span></div>
        <div class="shop-price-row"><div><span class="shop-old-price">${money(p.oldPrice)}</span><div class="shop-price-main">${fa.format(p.price)} <small>تومان</small></div></div><span class="shop-discount">${fa.format(discount(p))}٪</span></div>
        <div class="shop-installment"><span>از <strong>${money(monthly(p,4))}</strong> / قسط</span><div class="shop-installment-logos"><img src="${providerLogo('dimapay')}" alt="دیماپی"><img src="${providerLogo('snapppay')}" alt="اسنپ‌پی"><img src="${providerLogo('digipay')}" alt="دیجی‌پی"></div></div>
        <button class="shop-add-btn ${state.cart[p.id]?'added':''}" data-add="${p.id}" type="button">${state.cart[p.id]?`در سبد · ${fa.format(state.cart[p.id])}`:'افزودن به سبد'}</button>
      </div>
    </article>`;
  }

  function filteredProducts(){
    let list = [...products];
    if(state.category !== 'all') list = list.filter(p=>p.category===state.category);
    if(state.search){
      const needle = state.search.trim().toLowerCase();
      list = list.filter(p => [p.title,p.brand,p.country,p.category,...p.tags].join(' ').toLowerCase().includes(needle));
    }
    if(state.inStock) list = list.filter(p=>p.stock>0);
    if(state.installment) list = list.filter(p=>p.price>=500000);
    if(state.sort==='price-asc') list.sort((a,b)=>a.price-b.price);
    if(state.sort==='price-desc') list.sort((a,b)=>b.price-a.price);
    if(state.sort==='rating') list.sort((a,b)=>b.rating-a.rating || b.reviews-a.reviews);
    if(state.sort==='discount') list.sort((a,b)=>discount(b)-discount(a));
    return list;
  }

  function renderProducts(){
    const list = filteredProducts();
    const grid = q('#shopProductGrid');
    if(grid) grid.innerHTML = list.map(productCard).join('');
    const count = q('#shopResultCount');
    if(count) count.innerHTML = `<strong>${fa.format(list.length)}</strong> محصول برای شما`;
    q('#shopEmpty')?.classList.toggle('show', list.length===0);
    qa('[data-shop-cat]').forEach(b=>b.classList.toggle('active',b.dataset.shopCat===state.category));
    updateFilterChecks();
  }

  function updateFilterChecks(){
    qa('[data-category-check]').forEach(el=>{el.checked = state.category==='all' ? el.value==='all' : el.value===state.category});
    qa('[data-category-check-mobile]').forEach(el=>{el.checked = state.category==='all' ? el.value==='all' : el.value===state.category});
    qa('[data-instock]').forEach(el=>el.checked=state.inStock);
    qa('[data-installment]').forEach(el=>el.checked=state.installment);
  }

  function setCategory(cat){ state.category = cat; renderProducts(); q('#products')?.scrollIntoView({behavior:'smooth',block:'start'}); }

  function addToCart(id, amount=1){
    const p = getProduct(id); if(!p) return;
    state.cart[id] = Math.min(p.stock, (state.cart[id]||0)+amount);
    persistCart(); renderCart(); renderProducts();
  }
  function changeQty(id, delta){
    const p=getProduct(id); if(!p) return;
    const next=(state.cart[id]||0)+delta;
    if(next<=0) delete state.cart[id]; else state.cart[id]=Math.min(p.stock,next);
    persistCart(); renderCart(); renderProducts();
  }
  function removeFromCart(id){ delete state.cart[id]; persistCart(); renderCart(); renderProducts(); }

  function renderCart(){
    const count=totalCartItems();
    qa('[data-cart-count]').forEach(el=>el.textContent=fa.format(count));
    const wrap=q('#shopCartItems');
    const entries=Object.entries(state.cart);
    if(wrap){
      if(!entries.length){
        wrap.innerHTML=`<div class="shop-cart-empty"><div><div class="shop-cart-empty-icon">🛍️</div><strong>سبد شما هنوز خالی است</strong><p class="small mt-2 mb-0">محصول موردنظرتان را اضافه کنید؛ قیمت اقساط هم کنار هر کالا مشخص است.</p></div></div>`;
      } else {
        wrap.innerHTML=entries.map(([id,qty])=>{
          const p=getProduct(id); if(!p) return '';
          return `<div class="shop-cart-item"><img src="${img(p.image)}" alt="${p.title}"><div><div class="shop-cart-item-brand">${p.brand}</div><div class="shop-cart-item-title">${p.title}</div><div class="shop-cart-item-price">${money(p.price*qty)}</div><div class="shop-qty"><button type="button" data-qty="${id}" data-delta="1">+</button><span>${fa.format(qty)}</span><button type="button" data-qty="${id}" data-delta="-1">−</button></div></div><button class="shop-cart-remove" type="button" data-remove="${id}" aria-label="حذف">×</button></div>`;
        }).join('');
      }
    }
    const subtotal=cartSubtotal(), shipping=shippingCost(), total=subtotal+shipping;
    q('#cartSubtotal') && (q('#cartSubtotal').textContent=money(subtotal));
    q('#cartShipping') && (q('#cartShipping').textContent=shipping===0 && subtotal>0?'رایگان':money(shipping));
    q('#cartTotal') && (q('#cartTotal').textContent=money(total));
    const btn=q('#cartCheckout'); if(btn) btn.disabled=!entries.length;
  }

  function openCart(){ q('#shopCartOverlay')?.classList.add('open'); q('#shopCartDrawer')?.classList.add('open'); document.body.classList.add('is-scroll-locked'); }
  function closeCart(){ q('#shopCartOverlay')?.classList.remove('open'); q('#shopCartDrawer')?.classList.remove('open'); document.body.classList.remove('is-scroll-locked'); }

  function detailMarkup(p){
    const altImgs = [p.image,'products.webp'].map((name,i)=> i===0?img(name):`${root}assets/images/photoreal/${name}`);
    const thumbs=[...altImgs, img(p.category==='beauty'?'serum.webp':p.category==='dental'?'toothbrush.webp':p.category==='health'?'bp-monitor.webp':'yoga-mat.webp'), `${root}assets/images/photoreal/products.webp`];
    return `<div class="shop-product-detail-grid">
      <div class="shop-detail-gallery"><div class="shop-detail-main-img"><img id="detailMainImg" src="${img(p.image)}" alt="${p.title}"></div><div class="shop-detail-thumbs">${thumbs.map(src=>`<button class="shop-detail-thumb" type="button" data-detail-img="${src}"><img src="${src}" alt="نمای محصول"></button>`).join('')}</div></div>
      <div class="shop-detail-content">
        <div class="shop-detail-brand">${p.brand} · ساخت ${p.country}</div><h2 class="shop-detail-title">${p.title}</h2>
        <div class="shop-detail-meta"><span>★ ${fa.format(p.rating)} از ۵</span><span>${fa.format(p.reviews)} نظر مشتری</span><span>${p.tags.join(' · ')}</span></div>
        <div class="shop-detail-pricebox"><div><span class="shop-detail-price">${money(p.price)}</span><span class="shop-detail-old">${money(p.oldPrice)}</span></div><div class="shop-detail-stock">${fa.format(p.stock)} عدد موجود · ${p.delivery}</div><div class="shop-detail-cta"><button class="shop-detail-add" type="button" data-add="${p.id}">افزودن به سبد خرید</button><button class="shop-detail-like" type="button" data-fav="${p.id}" aria-label="علاقه‌مندی" aria-pressed="${String(state.favorites.has(p.id))}">${state.favorites.has(p.id)?'♥':'♡'}</button></div></div>
        <div class="shop-detail-tabs" role="tablist" aria-label="اطلاعات محصول"><button type="button" class="shop-detail-tab active" id="shop-tab-about" role="tab" aria-selected="true" aria-controls="shop-pane-about" data-detail-tab="about">معرفی</button><button type="button" class="shop-detail-tab" id="shop-tab-specs" role="tab" aria-selected="false" aria-controls="shop-pane-specs" data-detail-tab="specs">مشخصات</button><button type="button" class="shop-detail-tab" id="shop-tab-installment" role="tab" aria-selected="false" aria-controls="shop-pane-installment" data-detail-tab="installment">پرداخت اقساطی</button><button type="button" class="shop-detail-tab" id="shop-tab-usage" role="tab" aria-selected="false" aria-controls="shop-pane-usage" data-detail-tab="usage">روش استفاده</button><button type="button" class="shop-detail-tab" id="shop-tab-reviews" role="tab" aria-selected="false" aria-controls="shop-pane-reviews" data-detail-tab="reviews">نظرات</button></div>
        <div class="shop-tab-pane active" id="shop-pane-about" role="tabpanel" aria-labelledby="shop-tab-about" data-detail-pane="about"><p class="shop-detail-text">${p.description}</p><div class="shop-warning">روش تحویل: ${p.delivery}. ارسال رایگان برای سفارش‌های بالاتر از ${money(1500000)}.</div></div>
        <div class="shop-tab-pane" id="shop-pane-specs" role="tabpanel" aria-labelledby="shop-tab-specs" data-detail-pane="specs"><div class="shop-spec-grid">${Object.entries(p.specs).map(([k,v])=>`<div class="shop-spec"><span>${k}</span><strong>${v}</strong></div>`).join('')}<div class="shop-spec"><span>واحد فروش</span><strong>${p.unit}</strong></div><div class="shop-spec"><span>وزن بسته</span><strong>${p.weight}</strong></div></div></div>
        <div class="shop-tab-pane" id="shop-pane-installment" role="tabpanel" aria-labelledby="shop-tab-installment" data-detail-pane="installment"><p class="shop-detail-text mb-2">قیمت و تعداد اقساط بسته به اعتبار و قوانین هر سرویس در زمان پرداخت نهایی می‌شود.</p>${providerDefs.map(pr=>`<div class="shop-provider-detail"><img src="${providerLogo(pr.id)}" alt="${pr.name}"><div><strong>${pr.name}</strong><span>${pr.note} · انتخاب در مرحله پرداخت</span></div><b>از ${money(monthly(p,pr.count))}</b></div>`).join('')}</div>
        <div class="shop-tab-pane" id="shop-pane-usage" role="tabpanel" aria-labelledby="shop-tab-usage" data-detail-pane="usage">${p.usage.map((t,i)=>`<div class="shop-usage-step"><span class="shop-usage-num">${fa.format(i+1)}</span><p>${t}</p></div>`).join('')}<div class="shop-warning mt-3">${p.warning}</div></div>
        <div class="shop-tab-pane" id="shop-pane-reviews" role="tabpanel" aria-labelledby="shop-tab-reviews" data-detail-pane="reviews"><div class="shop-detail-review"><div class="shop-detail-review-head"><strong>مریم</strong><span>خریدار تأییدشده · ۲ هفته پیش</span></div><p>بسته‌بندی مرتب بود و اطلاعات محصول و زمان تحویل دقیق نمایش داده شد.</p></div><div class="shop-detail-review"><div class="shop-detail-review-head"><strong>آرمان</strong><span>خریدار تأییدشده · ۱ ماه پیش</span></div><p>امکان دیدن مبلغ هر قسط قبل از اضافه‌کردن به سبد خیلی کاربردی بود.</p></div><div class="shop-detail-review"><div class="shop-detail-review-head"><strong>سارا</strong><span>خریدار تأییدشده · ۲ ماه پیش</span></div><p>محصول مطابق توضیحات رسید و پیگیری سفارش ساده بود.</p></div></div>
      </div></div>`;
  }

  let productModal;
  function openProduct(id){
    const p=getProduct(id); if(!p) return;
    q('#productModalBody').innerHTML=detailMarkup(p);
    productModal ||= new bootstrap.Modal(q('#productModal'));
    productModal.show();
  }

  function renderCheckout(){
    const wrap=q('#checkoutItems');
    const entries=Object.entries(state.cart);
    if(wrap) wrap.innerHTML=entries.map(([id,qty])=>{const p=getProduct(id);return `<div class="shop-checkout-mini"><img src="${img(p.image)}" alt="${p.title}"><div class="flex-grow-1"><strong>${p.title}</strong><span>${fa.format(qty)} عدد · ${money(p.price*qty)}</span></div></div>`}).join('');
    q('#checkoutTotal') && (q('#checkoutTotal').textContent=money(cartSubtotal()+shippingCost()));
  }

  function applyUrlState(){
    const params = new URLSearchParams(location.search);
    const cat=params.get('cat');
    if(['health','beauty','wellness','dental','daily'].includes(cat)) state.category=cat;
    const s=params.get('q'); if(s){state.search=s; const input=q('#shopSearchInput'); if(input) input.value=s;}
  }

  function wireEvents(){
    document.addEventListener('click', e=>{
      const cat=e.target.closest('[data-shop-cat]'); if(cat){setCategory(cat.dataset.shopCat);return;}
      const fav=e.target.closest('[data-fav]'); if(fav){const id=fav.dataset.fav;state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id);persistFavs();const inModal=Boolean(fav.closest('.modal'));renderProducts();if(inModal){fav.textContent=state.favorites.has(id)?'♥':'♡';fav.classList.toggle('active',state.favorites.has(id));fav.setAttribute('aria-pressed',String(state.favorites.has(id)));}return;}
      const open=e.target.closest('[data-open-product]'); if(open){openProduct(open.dataset.openProduct);return;}
      const add=e.target.closest('[data-add]'); if(add){addToCart(add.dataset.add); add.classList.add('added'); add.textContent='به سبد اضافه شد'; setTimeout(()=>{ if(add.closest('.modal')) add.textContent='افزودن به سبد خرید'; },900); return;}
      const qty=e.target.closest('[data-qty]'); if(qty){changeQty(qty.dataset.qty,Number(qty.dataset.delta));return;}
      const rem=e.target.closest('[data-remove]'); if(rem){removeFromCart(rem.dataset.remove);return;}
      if(e.target.closest('[data-cart-open]')){openCart();return;}
      if(e.target.closest('[data-cart-close]') || e.target.id==='shopCartOverlay'){closeCart();return;}
      const tab=e.target.closest('[data-detail-tab]'); if(tab){const n=tab.dataset.detailTab;qa('[data-detail-tab]',q('#productModal')).forEach(x=>{const active=x.dataset.detailTab===n;x.classList.toggle('active',active);x.setAttribute('aria-selected',String(active));});qa('[data-detail-pane]',q('#productModal')).forEach(x=>x.classList.toggle('active',x.dataset.detailPane===n));return;}
      const thumb=e.target.closest('[data-detail-img]'); if(thumb){q('#detailMainImg').src=thumb.dataset.detailImg;return;}
      const quick=e.target.closest('[data-quick-search]'); if(quick){const v=quick.dataset.quickSearch;state.search=v;q('#shopSearchInput').value=v;renderProducts();q('#products')?.scrollIntoView({behavior:'smooth'});return;}
      if(e.target.closest('#cartCheckout')){renderCheckout();closeCart();new bootstrap.Modal(q('#checkoutModal')).show();return;}
    });

    q('#shopSearchForm')?.addEventListener('submit',e=>{e.preventDefault();state.search=q('#shopSearchInput').value.trim();renderProducts();q('#products')?.scrollIntoView({behavior:'smooth'});});
    q('#shopSearchInput')?.addEventListener('input',e=>{state.search=e.target.value.trim(); if(state.search.length===0 || state.search.length>=2) renderProducts();});
    q('#shopSort')?.addEventListener('change',e=>{state.sort=e.target.value;renderProducts();});
    qa('[data-category-check]').forEach(el=>el.addEventListener('change',e=>{ if(e.target.checked){state.category=e.target.value;renderProducts();} }));
    qa('[data-category-check-mobile]').forEach(el=>el.addEventListener('change',e=>{ if(e.target.checked){state.category=e.target.value;renderProducts();} }));
    qa('[data-instock]').forEach(el=>el.addEventListener('change',e=>{state.inStock=e.target.checked;renderProducts();}));
    qa('[data-installment]').forEach(el=>el.addEventListener('change',e=>{state.installment=e.target.checked;renderProducts();}));
    qa('[data-filter-reset]').forEach(el=>el.addEventListener('click',()=>{state.category='all';state.inStock=false;state.installment=false;state.search='';q('#shopSearchInput').value='';renderProducts();}));

    q('#checkoutForm')?.addEventListener('submit',e=>{
      e.preventDefault();
      const submit=q('#checkoutSubmit');
      submit.disabled=true; submit.textContent='در حال ثبت سفارش…';
      setTimeout(()=>{
        state.cart={};persistCart();renderCart();renderProducts();
        bootstrap.Modal.getInstance(q('#checkoutModal'))?.hide();
        const toast=q('#shopSuccessToast');
        toast?.classList.add('show');
        setTimeout(()=>toast?.classList.remove('show'),4500);
        submit.disabled=false;submit.textContent='ثبت سفارش آزمایشی';
      },700);
    });

    document.addEventListener('keydown',e=>{if(e.key==='Escape') closeCart();});
  }

  applyUrlState();
  renderProducts();
  renderCart();
  wireEvents();
})();
