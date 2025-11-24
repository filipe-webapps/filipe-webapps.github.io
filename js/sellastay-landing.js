// SellaStay Landing Page - Complete i18n System

class SellaStayLanding {
  constructor() {
    this.currentSlide = 0;
    this.testimonialSlides = [];
    this.slideInterval = null;
    this.currentLanguage = 'pt';
    this.translations = {};
    this.init();
  }

  async init() {
    await this.loadTranslations();
    this.detectAndSetLanguage();
    this.bindEvents();
    this.initAnimations();
    this.initPricingToggle();
    this.initMobileMenu();
    this.initLanguageSelector();
    this.initTestimonialsCarousel();
    this.trackAnalytics();
  }

  async loadTranslations() {
    // Complete translations object
    this.translations = {
      pt: {
        // Meta and page info
        page_title: "SellaStay - CRM para Hotelaria | Transforme Leads em Reservas",
        meta_description: "SellaStay é o CRM especializado que revoluciona a gestão de leads no setor hoteleiro. Aumente suas conversões em até 40% com analytics inteligentes.",
        meta_keywords: "CRM hotelaria, gestão leads hotéis, software hoteleiro, revenue management, conversão reservas",
        og_title: "SellaStay - CRM para Hotelaria",
        og_description: "Organize negociações e propostas de um jeito muito mais eficiente!",
        
        // Navigation
        nav_features: "Recursos",
        nav_pricing: "Preços", 
        nav_testimonials: "Cases",
        nav_faq: "FAQ",
        nav_demo: "Demo Grátis",
        lang_portuguese: "🇧🇷 Português",
        lang_english: "🇺🇸 English",
        lang_spanish: "🇪🇸 Español",
        
        // Hero section
        hero_badge: "🚀 Mais de 500 hotéis confiam na SellaStay",
        hero_title_1: "Organize",
        hero_title_2: "negociações e propostas",
        hero_title_3: "de um jeito muito mais eficiente!",
        hero_description: "O SellaStay revoluciona a gestão de leads na hotelaria com analytics inteligentes e automação que <strong>aumenta suas conversões em até 40%</strong>.",
        hero_cta_primary: "Começar Demo Gratuita",
        hero_cta_secondary: "Ver Como Funciona",
        
        // Features section
        features_badge: "Recursos Poderosos",
        features_title: "Tudo que seu hotel precisa em uma única plataforma",
        features_description: "Gerencie leads, automatize follow-ups e tome decisões baseadas em dados reais",
        feature_badge_popular: "Diferencial!",
        feature_1_title: "CRM Inteligente",
        feature_1_description: "Sistema Kanban visual com scoring automático de leads e pipeline drag & drop.",
        feature_2_title: "Analytics Avançados", 
        feature_2_description: "Dashboards em tempo real com métricas que importam e previsões de receita.",
        feature_3_title: "Automação Inteligente",
        feature_3_description: "Follow-ups automáticos e workflows que nunca deixam um lead escapar.",
        feature_4_title: "Gestão de Clientes",
        feature_4_description: "Base completa com histórico, preferências e segmentação avançada.",
        feature_5_title: "Calendário Integrado",
        feature_5_description: "Eventos automatizados com sincronização Google e lembretes push.",
        feature_6_title: "Metas & Objetivos",
        feature_6_description: "Tracking em tempo real com sistema de conquistas e gamificação.",
        
        // Testimonials
        testimonials_badge: "Cases de Sucesso",
        testimonials_title: "Hotéis que já transformaram seus resultados",
        testimonial_1_text: "\"O SellaStay aumentou nossa conversão de leads em 45% no primeiro mês. O dashboard é incrível e finalmente conseguimos ter visibilidade total do funil.\"",
        testimonial_1_title: "Diretor Comercial, Atlântica Hotels",
        testimonial_2_text: "\"Antes perdíamos leads no meio do caminho. Agora com o SellaStay temos controle total e nossa receita cresceu 60% em 6 meses.\"",
        testimonial_2_title: "Revenue Manager, Bristol Hotéis",
        testimonial_3_text: "\"Interface intuitiva, relatórios poderosos e suporte excepcional. O SellaStay é essencial para qualquer hotel sério sobre vendas.\"",
        testimonial_3_title: "Gerente de Vendas, Pestana Hotel Group",
        
        // Metrics
        metric_1_label: "Hotéis Ativos",
        metric_2_label: "Leads Processados", 
        metric_3_label: "Receita Gerada",
        metric_4_label: "Satisfação",
        
        // Pricing
        pricing_badge: "Planos Flexíveis",
        pricing_title: "Escolha o plano ideal para seu hotel",
        pricing_description: "Todos os planos incluem suporte 24/7 e garantia de 30 dias",
        pricing_monthly: "Mensal",
        pricing_yearly: "Anual",
        price_period: "/mês",
        plan_popular_badge: "Mais Popular",
        
        // Plan 1 - Starter
        plan_1_name: "Starter",
        plan_1_description: "Perfeito para Freelancers",
        plan_1_feature_1: "✓ Até 100 leads/mês",
        plan_1_feature_2: "✓ CRM básico",
        plan_1_feature_3: "✓ Dashboard essencial",
        plan_1_feature_4: "✓ 2 usuários",
        plan_1_feature_5: "✓ Suporte por email",
        plan_1_cta: "Começar Grátis",
        currencym1: "R$ 49",
        currencyy1: "R$ 39",
        
        
        // Plan 2 - Professional  
        plan_2_name: "Professional",
        plan_2_description: "Ideal para Guias e Agências",
        plan_2_feature_1: "✓ Até 500 leads/mês",
        plan_2_feature_2: "✓ CRM completo", 
        plan_2_feature_3: "✓ Analytics avançados",
        plan_2_feature_4: "✓ 10 usuários",
        plan_2_feature_5: "✓ Automação completa",
        plan_2_feature_6: "✓ Suporte prioritário",
        plan_2_cta: "Começar Teste",
        currencym2: "R$ 99",
        currencyy2: "R$ 79",
        
        // Plan 3 - Scale
        plan_3_name: "Scale",
        plan_3_description: "Grandes agências e hotéis",
        plan_3_feature_1: "✓ Leads ilimitados",
        plan_3_feature_2: "✓ Multi-propriedades",
        plan_3_feature_3: "✓ BI & Analytics", 
        plan_3_feature_4: "✓ Usuários ilimitados",
        plan_3_feature_5: "✓ White-label",
        plan_3_feature_6: "✓ Suporte dedicado",
        plan_3_cta: "Falar com Vendas",
        currencym3: "R$ 149",
        currencyy3: "R$ 119",

        // Plan 4 - Enterprise
        plan_4_name: "Enterprise",
        plan_4_description: "precisa de algo mais <strong>personalizado</strong>?",
        plan_4_talk: "Fale com um especialista!",
        plan_4_cta: "Falar com Especialista", 
        
        // Guarantee
        guarantee_title: "Garantia de 30 dias",
        guarantee_text: "Não satisfeito? Devolvemos 100% do seu dinheiro, sem perguntas.",
        
        // FAQ
        faq_badge: "Dúvidas Frequentes",
        faq_title: "Tudo que você precisa saber sobre o SellaStay",
        faq_1_question: "Como o SellaStay aumenta a conversão de leads?",
        faq_1_answer: "O SellaStay utiliza automação inteligente, scoring de leads e follow-ups automáticos para garantir que nenhum lead seja perdido. Nosso sistema identifica os leads mais promissores e orienta sua equipe sobre as melhores ações para convertê-los em reservas.",
        faq_2_question: "É difícil implementar o SellaStay no meu hotel?",
        faq_2_answer: "Não! O SellaStay foi projetado para ser intuitivo e fácil de usar. Oferecemos onboarding completo, treinamento da equipe e suporte 24/7. A maioria dos hotéis está operando em menos de 48 horas.",
        faq_3_question: "O SellaStay integra com meu sistema atual?",
        faq_3_answer: "Sim! Integramos com os principais PMS (Property Management Systems), sistemas de reserva, Google Sheets, WhatsApp Business e mais de 50 ferramentas populares na hotelaria.",
        faq_4_question: "Posso cancelar minha assinatura a qualquer momento?",
        faq_4_answer: "Claro! Não há contratos de permanência. Você pode cancelar sua assinatura a qualquer momento através do painel administrativo ou entrando em contato conosco.",
        faq_5_question: "Meus dados ficam seguros no SellaStay?",
        faq_5_answer: "Absoluta segurança! Utilizamos criptografia SSL 256-bit, backups automáticos diários, servidores na AWS com certificação SOC 2 e estamos em conformidade com a LGPD brasileira.",
        faq_6_question: "Existe período de teste gratuito?",
        faq_6_answer: "Sim! Oferecemos 14 dias de teste gratuito com acesso completo a todos os recursos. Não é necessário cartão de crédito para começar.",
        
        // CTA
        cta_title: "Pronto para transformar seus leads em receita?",
        cta_description: "Junte-se a mais de 500 hotéis que já aumentaram suas conversões com o SellaStay",
        cta_primary: "Começar Teste Gratuito",
        cta_secondary: "Agendar Demonstração",
        cta_guarantee_1: "✓ Teste gratuito de 14 dias",
        cta_guarantee_2: "✓ Sem cartão de crédito",
        cta_guarantee_3: "✓ Suporte em português",
        
        // Footer
        footer_description: "O CRM que transforma leads em reservas.",
        footer_product_title: "Produto",
        footer_features: "Recursos",
        footer_pricing: "Preços",
        footer_integrations: "Integrações", 
        footer_security: "Segurança",
        footer_company_title: "Empresa",
        footer_about: "Sobre nós",
        footer_blog: "Blog",
        footer_careers: "Carreiras",
        footer_partners: "Parceiros",
        footer_support_title: "Suporte",
        footer_help: "Central de Ajuda",
        footer_contact: "Contato",
        footer_status: "Status",
        footer_docs: "Documentação",
        footer_copyright: "&copy; 2025 SellaStay. Todos os direitos reservados."
      },
      
      en: {
        // Meta and page info
        page_title: "SellaStay - Hospitality CRM | Transform Leads into Bookings",
        meta_description: "SellaStay is the specialized CRM that revolutionizes lead management in the hotel industry. Increase your conversions by up to 40% with intelligent analytics.",
        meta_keywords: "hospitality CRM, hotel lead management, hotel software, revenue management, booking conversion",
        og_title: "SellaStay - Hospitality CRM",
        og_description: "Organize negotiations and proposals in a much more efficient way!",
        
        // Navigation
        nav_features: "Features",
        nav_pricing: "Pricing",
        nav_testimonials: "Cases",
        nav_faq: "FAQ",
        nav_demo: "Free Demo",
        lang_portuguese: "🇧🇷 Português",
        lang_english: "🇺🇸 English", 
        lang_spanish: "🇪🇸 Español",
        
        // Hero section
        hero_badge: "🚀 Over 500 hotels trust SellaStay",
        hero_title_1: "Organize",
        hero_title_2: "negotiations and proposals", 
        hero_title_3: "in a much more efficient way!",
        hero_description: "SellaStay revolutionizes lead management in hospitality with intelligent analytics and automation that <strong>increases your conversions by up to 40%</strong>.",
        hero_cta_primary: "Start Free Demo",
        hero_cta_secondary: "See How It Works",
        
        // Features section
        features_badge: "Powerful Features",
        features_title: "Everything your hotel needs in one platform",
        features_description: "Manage leads, automate follow-ups and make decisions based on real data",
        feature_badge_popular: "Our Edge!",
        feature_1_title: "Smart CRM",
        feature_1_description: "Visual Kanban system with automatic lead scoring and drag & drop pipeline.",
        feature_2_title: "Advanced Analytics",
        feature_2_description: "Real-time dashboards with metrics that matter and revenue forecasting.",
        feature_3_title: "Intelligent Automation",
        feature_3_description: "Automatic follow-ups and workflows that never let a lead escape.",
        feature_4_title: "Customer Management",
        feature_4_description: "Complete database with history, preferences and advanced segmentation.",
        feature_5_title: "Integrated Calendar",
        feature_5_description: "Automated events with Google synchronization and push reminders.",
        feature_6_title: "Goals & Objectives",
        feature_6_description: "Real-time tracking with achievement system and gamification.",
        
        // Testimonials
        testimonials_badge: "Success Stories",
        testimonials_title: "Hotels that have already transformed their results",
        testimonial_1_text: "\"SellaStay increased our lead conversion by 45% in the first month. The dashboard is amazing and we finally have full funnel visibility.\"",
        testimonial_1_title: "Commercial Director, Atlântica Hotels",
        testimonial_2_text: "\"We used to lose leads along the way. Now with SellaStay we have total control and our revenue grew 60% in 6 months.\"",
        testimonial_2_title: "Revenue Manager, Bristol Hotels",
        testimonial_3_text: "\"Intuitive interface, powerful reports and exceptional support. SellaStay is essential for any hotel serious about sales.\"",
        testimonial_3_title: "Sales Manager, Pestana Hotel Group",
        
        // Metrics
        metric_1_label: "Active Hotels",
        metric_2_label: "Leads Processed",
        metric_3_label: "Revenue Generated",
        metric_4_label: "Satisfaction",
        
        // Pricing
        pricing_badge: "Flexible Plans",
        pricing_title: "Choose the perfect plan for your hotel",
        pricing_description: "All plans include 24/7 support and 30-day guarantee",
        pricing_monthly: "Monthly",
        pricing_yearly: "Annual",
        price_period: "/month",
        plan_popular_badge: "Most Popular",
        
        // Plan 1 - Starter
        plan_1_name: "Starter",
        plan_1_description: "Perfect for starting hotels",
        plan_1_feature_1: "✓ Up to 100 leads/month",
        plan_1_feature_2: "✓ Basic CRM",
        plan_1_feature_3: "✓ Essential dashboard",
        plan_1_feature_4: "✓ 2 users",
        plan_1_feature_5: "✓ Email support",
        plan_1_cta: "Start Free",
        currencym1: "$ 19",
        currencyy1: "$ 15",
        
        // Plan 2 - Professional
        plan_2_name: "Professional",
        plan_2_description: "Ideal for growing hotels",
        plan_2_feature_1: "✓ Up to 500 leads/month",
        plan_2_feature_2: "✓ Complete CRM",
        plan_2_feature_3: "✓ Advanced analytics",
        plan_2_feature_4: "✓ 10 users",
        plan_2_feature_5: "✓ Full automation",
        plan_2_feature_6: "✓ Priority support",
        plan_2_cta: "Start Trial",
        currencym2: "$ 49",
        currencyy2: "$ 39",
        
        // Plan 3 - Scale
        plan_3_name: "Scale",
        plan_3_description: "For chains and large hotels",
        plan_3_feature_1: "✓ Unlimited leads",
        plan_3_feature_2: "✓ Multi-properties",
        plan_3_feature_3: "✓ BI & Analytics",
        plan_3_feature_4: "✓ Unlimited users",
        plan_3_feature_5: "✓ White-label",
        plan_3_feature_6: "✓ Dedicated support",
        plan_3_cta: "Contact Sales",
        currencym3: "$ 99",
        currencyy3: "$ 79",

        // Plan 4 - Enterprise
        plan_4_name: "Enterprise",
        plan_4_description: "Need something more <strong>customized</strong>?",
        plan_4_talk: "Talk to a specialist!",
        plan_4_cta: "Talk to Specialist",

        
        // Guarantee
        guarantee_title: "30-day guarantee",
        guarantee_text: "Not satisfied? We return 100% of your money, no questions asked.",
        
        // FAQ
        faq_badge: "Frequently Asked Questions",
        faq_title: "Everything you need to know about SellaStay",
        faq_1_question: "How does SellaStay increase lead conversion?",
        faq_1_answer: "SellaStay uses intelligent automation, lead scoring and automatic follow-ups to ensure no lead is lost. Our system identifies the most promising leads and guides your team on the best actions to convert them into bookings.",
        faq_2_question: "Is it difficult to implement SellaStay in my hotel?",
        faq_2_answer: "No! SellaStay was designed to be intuitive and easy to use. We offer complete onboarding, team training and 24/7 support. Most hotels are operating in less than 48 hours.",
        faq_3_question: "Does SellaStay integrate with my current system?",
        faq_3_answer: "Yes! We integrate with major PMS (Property Management Systems), booking systems, Google Sheets, WhatsApp Business and more than 50 popular hospitality tools.",
        faq_4_question: "Can I cancel my subscription at any time?",
        faq_4_answer: "Of course! There are no permanence contracts. You can cancel your subscription at any time through the admin panel or by contacting us.",
        faq_5_question: "Is my data safe with SellaStay?",
        faq_5_answer: "Absolute security! We use SSL 256-bit encryption, daily automatic backups, AWS servers with SOC 2 certification and comply with international data protection regulations.",
        faq_6_question: "Is there a free trial period?",
        faq_6_answer: "Yes! We offer 14 days of free trial with full access to all features. No credit card required to start.",
        
        // CTA
        cta_title: "Ready to transform your leads into revenue?",
        cta_description: "Join over 500 hotels that have already increased their conversions with SellaStay",
        cta_primary: "Start Free Trial",
        cta_secondary: "Schedule Demo",
        cta_guarantee_1: "✓ 14-day free trial",
        cta_guarantee_2: "✓ No credit card required",
        cta_guarantee_3: "✓ English support",
        
        // Footer
        footer_description: "The CRM that transforms leads into bookings.",
        footer_product_title: "Product",
        footer_features: "Features",
        footer_pricing: "Pricing",
        footer_integrations: "Integrations",
        footer_security: "Security",
        footer_company_title: "Company",
        footer_about: "About us",
        footer_blog: "Blog",
        footer_careers: "Careers",
        footer_partners: "Partners",
        footer_support_title: "Support",
        footer_help: "Help Center",
        footer_contact: "Contact",
        footer_status: "Status",
        footer_docs: "Documentation",
        footer_copyright: "&copy; 2025 SellaStay. All rights reserved."
      },
      
      es: {
        // Meta and page info
        page_title: "SellaStay - CRM Hotelero | Transforma Leads en Reservas",
        meta_description: "SellaStay es el CRM especializado que revoluciona la gestión de leads en el sector hotelero. Aumenta tus conversiones hasta un 40% con analytics inteligentes.",
        meta_keywords: "CRM hotelería, gestión leads hoteles, software hotelero, revenue management, conversión reservas",
        og_title: "SellaStay - CRM Hotelero",
        og_description: "¡Organiza negociaciones y propuestas de una manera mucho más eficiente!",
        
        // Navigation
        nav_features: "Características",
        nav_pricing: "Precios",
        nav_testimonials: "Casos",
        nav_faq: "FAQ",
        nav_demo: "Demo Gratis",
        lang_portuguese: "🇧🇷 Português",
        lang_english: "🇺🇸 English",
        lang_spanish: "🇪🇸 Español",
        
        // Hero section
        hero_badge: "🚀 Más de 500 hoteles confían en SellaStay",
        hero_title_1: "Negociaciones y propuestas de una manera",
        hero_title_2: "mucho más",
        hero_title_3: "Eficiente.",
        hero_description: "SellaStay revoluciona la gestión de leads en hotelería con analytics inteligentes y automatización que <strong>aumenta tus conversiones hasta un 40%</strong>.",
        hero_cta_primary: "Comenzar Demo Gratis",
        hero_cta_secondary: "Ver Cómo Funciona",
        
        // Features section
        features_badge: "Características Poderosas",
        features_title: "Todo lo que tu hotel necesita en una sola plataforma",
        features_description: "Gestiona leads, automatiza seguimientos y toma decisiones basadas en datos reales",
        feature_badge_popular: "¡Diferencial!",
        feature_1_title: "CRM Inteligente",
        feature_1_description: "Sistema Kanban visual con scoring automático de leads y pipeline drag & drop.",
        feature_2_title: "Analytics Avanzados",
        feature_2_description: "Dashboards en tiempo real con métricas importantes y predicciones de ingresos.",
        feature_3_title: "Automatización Inteligente",
        feature_3_description: "Seguimientos automáticos y workflows que nunca dejan escapar un lead.",
        feature_4_title: "Gestión de Clientes",
        feature_4_description: "Base completa con historial, preferencias y segmentación avanzada.",
        feature_5_title: "Calendario Integrado",
        feature_5_description: "Eventos automatizados con sincronización Google y recordatorios push.",
        feature_6_title: "Metas y Objetivos",
        feature_6_description: "Seguimiento en tiempo real con sistema de logros y gamificación.",
        
        // Testimonials
        testimonials_badge: "Casos de Éxito",
        testimonials_title: "Hoteles que ya han transformado sus resultados",
        testimonial_1_text: "\"SellaStay aumentó nuestra conversión de leads en un 45% en el primer mes. El dashboard es increíble y finalmente tenemos visibilidad total del embudo.\"",
        testimonial_1_title: "Director Comercial, Atlântica Hotels",
        testimonial_2_text: "\"Antes perdíamos leads en el camino. Ahora con SellaStay tenemos control total y nuestros ingresos crecieron 60% en 6 meses.\"",
        testimonial_2_title: "Revenue Manager, Bristol Hotels",
        testimonial_3_text: "\"Interfaz intuitiva, reportes poderosos y soporte excepcional. SellaStay es esencial para cualquier hotel serio sobre ventas.\"",
        testimonial_3_title: "Gerente de Ventas, Pestana Hotel Group",
        
        // Metrics
        metric_1_label: "Hoteles Activos",
        metric_2_label: "Leads Procesados",
        metric_3_label: "Ingresos Generados",
        metric_4_label: "Satisfacción",
        
        // Pricing
        pricing_badge: "Planes Flexibles",
        pricing_title: "Elige el plan perfecto para tu hotel",
        pricing_description: "Todos los planes incluyen soporte 24/7 y garantía de 30 días",
        pricing_monthly: "Mensual",
        pricing_yearly: "Anual",
        price_period: "/mes",
        plan_popular_badge: "Más Popular",
        
        // Plan 1 - Starter
        plan_1_name: "Starter",
        plan_1_description: "Perfecto para hoteles principiantes",
        plan_1_feature_1: "✓ Hasta 100 leads/mes",
        plan_1_feature_2: "✓ CRM básico",
        plan_1_feature_3: "✓ Dashboard esencial",
        plan_1_feature_4: "✓ 2 usuarios",
        plan_1_feature_5: "✓ Soporte por email",
        plan_1_cta: "Comenzar Gratis",
        currencym1: "$ 19",
        currencyy1: "$ 15",
        
        // Plan 2 - Professional
        plan_2_name: "Professional",
        plan_2_description: "Ideal para hoteles en crecimiento",
        plan_2_feature_1: "✓ Hasta 500 leads/mes",
        plan_2_feature_2: "✓ CRM completo",
        plan_2_feature_3: "✓ Analytics avanzados",
        plan_2_feature_4: "✓ 10 usuarios",
        plan_2_feature_5: "✓ Automatización completa",
        plan_2_feature_6: "✓ Soporte prioritario",
        plan_2_cta: "Comenzar Prueba",
        currencym2: "$ 49",
        currencyy2: "$ 39",
        
        // Plan 3 - Scale
        plan_3_name: "Scale",
        plan_3_description: "Para cadenas y hoteles grandes",
        plan_3_feature_1: "✓ Leads ilimitados",
        plan_3_feature_2: "✓ Multi-propiedades",
        plan_3_feature_3: "✓ BI y Analytics",
        plan_3_feature_4: "✓ Usuarios ilimitados",
        plan_3_feature_5: "✓ Marca blanca",
        plan_3_feature_6: "✓ Soporte dedicado",
        plan_3_cta: "Contactar Ventas",
        currencym3: "$ 99",
        currencyy3: "$ 79",

        // Plan 4 - Enterprise
        plan_4_name: "Enterprise",
        plan_4_description: "¿Necesitas algo más <strong>personalizado</strong>?",
        plan_4_talk: "¡Habla con un especialista!",
        plan_4_cta: "Hablar con Especialista",

        
        // Guarantee
        guarantee_title: "Garantía de 30 días",
        guarantee_text: "¿No satisfecho? Devolvemos el 100% de tu dinero, sin preguntas.",
        
        // FAQ
        faq_badge: "Preguntas Frecuentes",
        faq_title: "Todo lo que necesitas saber sobre SellaStay",
        faq_1_question: "¿Cómo aumenta SellaStay la conversión de leads?",
        faq_1_answer: "SellaStay utiliza automatización inteligente, scoring de leads y seguimientos automáticos para garantizar que ningún lead se pierda. Nuestro sistema identifica los leads más prometedores y guía a tu equipo sobre las mejores acciones para convertirlos en reservas.",
        faq_2_question: "¿Es difícil implementar SellaStay en mi hotel?",
        faq_2_answer: "¡No! SellaStay fue diseñado para ser intuitivo y fácil de usar. Ofrecemos onboarding completo, entrenamiento del equipo y soporte 24/7. La mayoría de hoteles están operando en menos de 48 horas.",
        faq_3_question: "¿SellaStay se integra con mi sistema actual?",
        faq_3_answer: "¡Sí! Nos integramos con los principales PMS (Property Management Systems), sistemas de reservas, Google Sheets, WhatsApp Business y más de 50 herramientas populares en hotelería.",
        faq_4_question: "¿Puedo cancelar mi suscripción en cualquier momento?",
        faq_4_answer: "¡Por supuesto! No hay contratos de permanencia. Puedes cancelar tu suscripción en cualquier momento a través del panel administrativo o contactándonos.",
        faq_5_question: "¿Mis datos están seguros con SellaStay?",
        faq_5_answer: "¡Seguridad absoluta! Utilizamos encriptación SSL 256-bit, backups automáticos diarios, servidores AWS con certificación SOC 2 y cumplimos con regulaciones internacionales de protección de datos.",
        faq_6_question: "¿Existe un período de prueba gratuito?",
        faq_6_answer: "¡Sí! Ofrecemos 14 días de prueba gratuita con acceso completo a todas las funciones. No se requiere tarjeta de crédito para comenzar.",
        
        // CTA
        cta_title: "¿Listo para transformar tus leads en ingresos?",
        cta_description: "Únete a más de 500 hoteles que ya han aumentado sus conversiones con SellaStay",
        cta_primary: "Comenzar Prueba Gratuita",
        cta_secondary: "Agendar Demostración",
        cta_guarantee_1: "✓ Prueba gratuita de 14 días",
        cta_guarantee_2: "✓ Sin tarjeta de crédito",
        cta_guarantee_3: "✓ Soporte en español",
        
        // Footer
        footer_description: "El CRM que transforma leads en reservas.",
        footer_product_title: "Producto",
        footer_features: "Características",
        footer_pricing: "Precios",
        footer_integrations: "Integraciones",
        footer_security: "Seguridad",
        footer_company_title: "Empresa",
        footer_about: "Sobre nosotros",
        footer_blog: "Blog",
        footer_careers: "Carreras",
        footer_partners: "Socios",
        footer_support_title: "Soporte",
        footer_help: "Centro de Ayuda",
        footer_contact: "Contacto",
        footer_status: "Estado",
        footer_docs: "Documentación",
        footer_copyright: "&copy; 2025 SellaStay. Todos los derechos reservados."
      }
    };
  }

  detectAndSetLanguage() {
    // Check if user has previously selected a language
    const storedLang = localStorage.getItem('sellastay_language');
    if (storedLang && this.translations[storedLang]) {
      this.setLanguage(storedLang);
      return;
    }

    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    let detectedLang = 'pt'; // default

    if (browserLang) {
      const shortLang = browserLang.slice(0, 2).toLowerCase();
      if (this.translations[shortLang]) {
        detectedLang = shortLang;
      }
    }

    this.setLanguage(detectedLang);
  }

  setLanguage(lang) {
    if (!this.translations[lang]) return;

    this.currentLanguage = lang;
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'en' ? 'en-US' : 'es-ES';
    
    // Update all elements with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.translations[lang][key];
      
      if (translation) {
        // Handle different element types
        if (element.tagName === 'INPUT' && element.type === 'submit') {
          element.value = translation;
        } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else if (element.hasAttribute('title')) {
          element.title = translation;
        } else if (element.hasAttribute('alt')) {
          element.alt = translation;
        } else if (element.hasAttribute('content')) {
          element.setAttribute('content', translation);
        } else {
          element.innerHTML = translation;
        }
      }
    });

    // Update language selector button
    const languageBtn = document.getElementById('language-btn');
    if (languageBtn) {
      const flags = { pt: '🇧🇷 PT', en: '🇺🇸 EN', es: '🇪🇸 ES' };
      languageBtn.innerHTML = `${flags[lang]} <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }

    // Update active language option
    document.querySelectorAll('.language-option').forEach(option => {
      option.classList.remove('active');
      if (option.getAttribute('data-lang') === lang) {
        option.classList.add('active');
      }
    });

    // Store language preference
    localStorage.setItem('sellastay_language', lang);
    
    // Track language change
    this.trackEvent('language_change', { language: lang });
  }

  bindEvents() {
    // Navigation scroll effect
    window.addEventListener('scroll', this.handleScroll.bind(this));
    
    // Mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
      navToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', this.smoothScroll.bind(this));
    });
  }

  handleScroll() {
    const navbar = document.getElementById('navbar');
    const logo = document.getElementById('nav-logo');
    
    if (window.scrollY > 10) {
      navbar?.classList.add('scrolled');
      if (logo) logo.src = 'img/logoheader.png';
    } else {
      navbar?.classList.remove('scrolled');
      if (logo) logo.src = 'img/logoheader_.png';
    }

    // Animate elements on scroll
    this.animateOnScroll();
  }

  toggleMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle?.classList.toggle('active');
    navMenu?.classList.toggle('active');
  }

smoothScroll(e) {
  e.preventDefault();
  const targetId = e.currentTarget.getAttribute('href');
  const targetElement = document.querySelector(targetId);
  
  if (targetElement) {
    // Calcular altura dinâmica do navbar
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 72;
    const extraOffset = 20; // Espaço adicional para respiração
    
    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight - extraOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Close mobile menu if open
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    navMenu?.classList.remove('active');
    navToggle?.classList.remove('active');
  }
}


  initLanguageSelector() {
    const languageBtn = document.getElementById('language-btn');
    const languageMenu = document.getElementById('language-menu');
    const languageOptions = document.querySelectorAll('.language-option');

    if (languageBtn && languageMenu) {
      languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageMenu.classList.toggle('active');
      });

      document.addEventListener('click', () => {
        languageMenu.classList.remove('active');
      });

      languageOptions.forEach(option => {
        option.addEventListener('click', (e) => {
          const selectedLang = e.target.getAttribute('data-lang');
          this.setLanguage(selectedLang);
          languageMenu.classList.remove('active');
        });
      });
    }
  }

  initTestimonialsCarousel() {
    this.testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (this.testimonialSlides.length === 0) return;

    // Set first slide as active
    this.showSlide(0);

    // Set up indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.showSlide(index);
        this.resetCarouselInterval();
      });
    });

    // Start auto-carousel
    this.startCarouselInterval();

    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        this.pauseCarousel();
      });

      carousel.addEventListener('mouseleave', () => {
        this.startCarouselInterval();
      });
    }
  }

  showSlide(index) {
    // Remove active class from all slides and indicators
    this.testimonialSlides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });

    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, idx) => {
      indicator.classList.toggle('active', idx === index);
    });

    this.currentSlide = index;
  }

  nextSlide() {
    let nextIndex = this.currentSlide + 1;
    if (nextIndex >= this.testimonialSlides.length) {
      nextIndex = 0;
    }
    this.showSlide(nextIndex);
  }

  startCarouselInterval() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 10000); // 10 seconds
  }

  pauseCarousel() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  resetCarouselInterval() {
    this.pauseCarousel();
    this.startCarouselInterval();
  }

  initAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('animate-on-scroll');
      this.observer.observe(section);
    });
  }

  initPricingToggle() {
    const pricingToggle = document.getElementById('pricing-toggle');
    if (!pricingToggle) return;

    pricingToggle.addEventListener('change', () => {
      const monthlyPrices = document.querySelectorAll('.monthly-price');
      const yearlyPrices = document.querySelectorAll('.yearly-price');

      if (pricingToggle.checked) {
        // Show yearly prices
        monthlyPrices.forEach(price => price.classList.add('hidden'));
        yearlyPrices.forEach(price => price.classList.remove('hidden'));
        this.trackEvent('pricing_toggle', { period: 'yearly' });
      } else {
        // Show monthly prices
        monthlyPrices.forEach(price => price.classList.remove('hidden'));
        yearlyPrices.forEach(price => price.classList.add('hidden'));
        this.trackEvent('pricing_toggle', { period: 'monthly' });
      }
    });
  }

  initMobileMenu() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      const navMenu = document.getElementById('nav-menu');
      const navToggle = document.getElementById('nav-toggle');
      
      if (navMenu?.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !navToggle?.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle?.classList.remove('active');
      }
    });
  }

  trackAnalytics() {
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track milestones
        if ([25, 50, 75, 90].includes(scrollPercent)) {
          this.trackEvent('scroll_depth', { scroll_percent: scrollPercent });
        }
      }
    });

    // Track CTA clicks
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('click', () => {
        this.trackEvent('cta_click', { 
          button_text: btn.textContent.trim(),
          language: this.currentLanguage 
        });
      });
    });
  }

  trackEvent(eventName, parameters = {}) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        ...parameters,
        language: this.currentLanguage
      });
    }
    
    // Console log for development
    console.log('Event tracked:', eventName, { ...parameters, language: this.currentLanguage });
  }

  animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll:not(.animated)');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('animated');
      }
    });
  }
}

// Função para scroll suave para qualquer seção
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbar = document.getElementById('navbar');
    const navbarHeight = navbar ? navbar.offsetHeight : 72;
    // const extraOffset = 20;
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navbarHeight - extraOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

// Atualizar a função scrollToFeatures
function scrollToFeatures() {
  scrollToSection('features');
}

// FAQ Functionality
function toggleFAQ(element) {
  const faqItem = element.parentElement;
  const isActive = faqItem.classList.contains('active');
  
  // Close all FAQ items
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add('active');
  }
}

// Demo and Contact Functions
function openDemo() {
  // Track conversion intent
  if (typeof gtag !== 'undefined') {
    gtag('event', 'begin_checkout', {
      currency: 'BRL',
      value: 397,
      items: [{
        item_id: 'professional_plan',
        item_name: 'SellaStay Professional',
        category: 'SaaS',
        quantity: 1,
        price: 397
      }]
    });
  }

  alert(window.sellaStayApp.currentLanguage === 'en' ? 'Demo will open! In production, this would open the registration form.' : 
        window.sellaStayApp.currentLanguage === 'es' ? '¡Demo se abrirá! En producción, esto abriría el formulario de registro.' :
        'Demo será aberta! Em produção, aqui abriria o formulário de cadastro.');
}

function scheduleDemo() {
  alert(window.sellaStayApp.currentLanguage === 'en' ? 'Schedule will open! In production, this would open Calendly.' :
        window.sellaStayApp.currentLanguage === 'es' ? '¡Agenda se abrirá! En producción, esto abriría Calendly.' :
        'Agenda será aberta! Em produção, aqui abriria o Calendly.');
}

function scrollToFeatures() {
  document.getElementById('features')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.sellaStayApp = new SellaStayLanding();
});