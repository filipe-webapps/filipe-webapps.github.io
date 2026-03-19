// --- 1. Custom Cursor Logic ---
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
const interactables = document.querySelectorAll('.interactable');
const currentYear = document.getElementById('current-year');
const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav-links a[href^="#"]'));
const navSections = Array.from(document.querySelectorAll('section[id][data-nav-target]'));
const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavCloseElements = Array.from(document.querySelectorAll('[data-mobile-nav-close]'));
const mobileNavLinks = Array.from(document.querySelectorAll('.mobile-nav-links a[href^="#"], .mobile-nav-cta'));
const serviceModal = document.getElementById('service-modal');
const serviceModalDialog = document.querySelector('.service-modal-dialog');
const serviceModalTriggers = Array.from(document.querySelectorAll('.service-card[data-service]'));
const serviceModalCloseElements = Array.from(document.querySelectorAll('[data-modal-close]'));
const serviceModalIcon = document.getElementById('service-modal-icon');
const serviceModalEyebrow = document.getElementById('service-modal-eyebrow');
const serviceModalTitle = document.getElementById('service-modal-title');
const serviceModalSummary = document.getElementById('service-modal-summary');
const serviceModalHighlights = document.getElementById('service-modal-highlights');
const serviceModalDeliverables = document.getElementById('service-modal-deliverables');
const serviceModalProcess = document.getElementById('service-modal-process');
const serviceModalBestFor = document.getElementById('service-modal-bestfor');
const serviceModalScopeTitle = document.getElementById('service-modal-scope-title');
const serviceModalProcessTitle = document.getElementById('service-modal-process-title');
const serviceModalBestForTitle = document.getElementById('service-modal-bestfor-title');
const serviceModalNote = document.getElementById('service-modal-note');
const serviceModalCta = document.getElementById('service-modal-cta');
const serviceModalCloseButton = document.querySelector('.service-modal-close');
const clientsTrack = document.getElementById('clients-track');
const clientCards = Array.from(document.querySelectorAll('.client-card'));
const clientsDots = document.getElementById('clients-dots');
const clientsPrevButton = document.querySelector('[data-clients-nav="prev"]');
const clientsNextButton = document.querySelector('[data-clients-nav="next"]');

let currentLanguage = 'pt';
let activeServiceModal = null;
let lastFocusedElement = null;
let clientsIndex = 0;
let clientsAutoplayTimer = null;
const supportedLanguages = ['pt', 'en', 'es'];
const languageStorageKey = 'mmlogistics-language';
const documentLanguageMap = {
    pt: 'pt-BR',
    en: 'en',
    es: 'es'
};

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

function updateActiveNavLink() {
    if (!navLinks.length || !navSections.length) return;

    const scrollPosition = window.scrollY + (window.innerHeight * 0.35);
    let activeSectionId = navSections[0].dataset.navTarget || navSections[0].id;

    navSections.forEach(section => {
        if (scrollPosition >= section.offsetTop) {
            activeSectionId = section.dataset.navTarget || section.id;
        }
    });

    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${activeSectionId}`;
        link.classList.toggle('active', isActive);
    });
}

function getClientsVisibleCount() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
}

function getClientsMaxIndex() {
    return Math.max(clientCards.length - getClientsVisibleCount(), 0);
}

function stopClientsAutoplay() {
    if (!clientsAutoplayTimer) return;
    window.clearInterval(clientsAutoplayTimer);
    clientsAutoplayTimer = null;
}

function renderClientsDots() {
    if (!clientsDots) return;

    const totalDots = getClientsMaxIndex() + 1;
    clientsDots.innerHTML = '';

    for (let index = 0; index < totalDots; index += 1) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `clients-dot${index === clientsIndex ? ' is-active' : ''}`;
        dot.setAttribute('aria-label', `Ir para depoimento ${index + 1}`);
        dot.addEventListener('click', () => {
            clientsIndex = index;
            updateClientsCarousel();
            startClientsAutoplay();
        });
        clientsDots.appendChild(dot);
    }
}

function updateClientsCarousel() {
    if (!clientsTrack || !clientCards.length) return;

    const maxIndex = getClientsMaxIndex();
    const gap = parseFloat(window.getComputedStyle(clientsTrack).gap || '0');
    const cardWidth = clientCards[0].getBoundingClientRect().width;

    clientsIndex = Math.max(0, Math.min(clientsIndex, maxIndex));
    clientsTrack.style.transform = `translateX(-${clientsIndex * (cardWidth + gap)}px)`;

    if (clientsPrevButton) {
        clientsPrevButton.disabled = clientsIndex === 0;
    }

    if (clientsNextButton) {
        clientsNextButton.disabled = clientsIndex === maxIndex;
    }

    Array.from(clientsDots?.children || []).forEach((dot, index) => {
        dot.classList.toggle('is-active', index === clientsIndex);
    });
}

function startClientsAutoplay() {
    stopClientsAutoplay();

    const maxIndex = getClientsMaxIndex();
    if (!clientsTrack || !clientCards.length || maxIndex === 0) return;

    clientsAutoplayTimer = window.setInterval(() => {
        if (document.hidden) return;

        clientsIndex = clientsIndex >= maxIndex ? 0 : clientsIndex + 1;
        updateClientsCarousel();
    }, 5200);
}

function initClientsCarousel() {
    if (!clientsTrack || !clientCards.length) return;

    renderClientsDots();
    updateClientsCarousel();
    startClientsAutoplay();

    clientsPrevButton?.addEventListener('click', () => {
        clientsIndex -= 1;
        updateClientsCarousel();
        startClientsAutoplay();
    });

    clientsNextButton?.addEventListener('click', () => {
        clientsIndex += 1;
        updateClientsCarousel();
        startClientsAutoplay();
    });

    clientsTrack.addEventListener('mouseenter', stopClientsAutoplay);
    clientsTrack.addEventListener('mouseleave', startClientsAutoplay);

    window.addEventListener('resize', () => {
        renderClientsDots();
        updateClientsCarousel();
    });
}

function getConfiguredAnchorOffset() {
    const configuredOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--anchor-offset'));
    return Number.isFinite(configuredOffset) ? configuredOffset : 0;
}

function getHeaderOffset() {
    const header = document.getElementById('main-header');
    if (!header) return getConfiguredAnchorOffset();

    if (window.scrollY <= 50) {
        return getConfiguredAnchorOffset();
    }

    return Math.max(header.getBoundingClientRect().height - 3, 0);
}

function correctAnchorPosition(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const expectedTop = getHeaderOffset();
    const actualTop = target.getBoundingClientRect().top;
    const delta = Math.round(actualTop - expectedTop);

    if (Math.abs(delta) <= 1) return;

    window.scrollTo({
        top: Math.max(window.scrollY + delta, 0)
    });
}

function scrollToAnchor(targetId) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const offset = getHeaderOffset();

    window.scrollTo({
        top: Math.max(targetTop - offset, 0),
        behavior: 'smooth'
    });

    history.pushState(null, '', targetId);

    window.setTimeout(() => correctAnchorPosition(targetId), 480);
    window.setTimeout(() => correctAnchorPosition(targetId), 760);
}

function openMobileMenu() {
    if (!mobileNav || !mobileMenuToggle) return;

    lastFocusedElement = document.activeElement;
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    mobileMenuToggle.classList.add('is-active');
    mobileMenuToggle.setAttribute('aria-expanded', 'true');
    mobileMenuToggle.setAttribute('aria-label', 'Fechar menu');
    document.body.classList.add('mobile-nav-open');
}

function closeMobileMenu() {
    if (!mobileNav || !mobileMenuToggle) return;

    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileMenuToggle.classList.remove('is-active');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'Abrir menu');
    document.body.classList.remove('mobile-nav-open');

    if (lastFocusedElement instanceof HTMLElement && window.innerWidth <= 992) {
        lastFocusedElement.focus();
    }

    lastFocusedElement = null;
}

const serviceModalUI = {
    pt: {
        close: 'Fechar modal',
        scopeTitle: 'O que entregamos',
        processTitle: 'Como funciona',
        bestForTitle: 'Ideal para esta operação',
        cta: "Solicitar Orçamento <i class='fa-solid fa-arrow-right'></i>",
        note: 'Desenhamos o fluxo ideal, validamos riscos e alinhamos prazo, custo e documentação com o seu objetivo comercial.'
    },
    en: {
        close: 'Close modal',
        scopeTitle: 'What we deliver',
        processTitle: 'How it works',
        bestForTitle: 'Best fit for this service',
        cta: "Request a Quote <i class='fa-solid fa-arrow-right'></i>",
        note: 'We map the ideal flow, validate operational risks, and align lead time, cost, and documentation with your commercial target.'
    },
    es: {
        close: 'Cerrar modal',
        scopeTitle: 'Lo que entregamos',
        processTitle: 'Cómo funciona',
        bestForTitle: 'Ideal para esta operación',
        cta: "Solicitar Cotización <i class='fa-solid fa-arrow-right'></i>",
        note: 'Diseñamos el flujo ideal, validamos riesgos y alineamos plazo, costo y documentación con su objetivo comercial.'
    }
};

const serviceModalContent = {
    sea: {
        icon: 'fa-solid fa-ship',
        pt: {
            eyebrow: 'Frete Marítimo',
            title: 'Transporte marítimo com previsibilidade, space protection e controle ponta a ponta',
            summary: 'Estruturamos embarques FCL, LCL e projetos especiais com foco em estabilidade de booking, racionalização de custos e visibilidade completa desde a origem até a entrega final.',
            highlights: ['FCL, LCL e carga projeto', 'Space protection com armadores parceiros', 'Gestão documental e tracking de milestones'],
            deliverables: [
                'Definição da melhor combinação entre transit time, custo total e rota internacional.',
                'Coordenação de booking, cut-off, stuffing, VGM, BL e eventos críticos da operação.',
                'Acompanhamento ativo de transbordos, conexões, ETA e exceções ao longo da jornada.',
                'Integração com coleta, armazenagem, desembaraço e entrega final quando necessário.'
            ],
            process: [
                'Analisamos origem, destino, Incoterm, janela de embarque e perfil da carga.',
                'Selecionamos armadores, frequência e rota com melhor equilíbrio entre custo e confiabilidade.',
                'Executamos booking, documentação e milestones operacionais com monitoramento contínuo.',
                'Tratamos desvios, atualizamos o cliente e coordenamos a chegada com o destino.'
            ],
            bestFor: [
                'Importações e exportações regulares com necessidade de previsibilidade operacional.',
                'Cargas consolidadas ou lotações completas com foco em escala internacional.',
                'Operações que exigem coordenação fina entre embarque marítimo e etapas terrestres.'
            ]
        },
        en: {
            eyebrow: 'Ocean Freight',
            title: 'Ocean freight with predictability, space protection, and end-to-end control',
            summary: 'We structure FCL, LCL, and special project shipments with a focus on booking stability, cost optimization, and full visibility from origin through final delivery.',
            highlights: ['FCL, LCL, and project cargo', 'Space protection with core carriers', 'Document management and milestone tracking'],
            deliverables: [
                'Best-fit routing based on transit time, total landed cost, and service reliability.',
                'Booking coordination, cut-off management, stuffing, VGM, BL issuance, and critical milestones.',
                'Active monitoring of transshipment events, connections, ETA shifts, and operational exceptions.',
                'Connection with pickup, warehousing, customs, and last-mile delivery when required.'
            ],
            process: [
                'We assess origin, destination, Incoterm, shipment window, and cargo profile.',
                'We select carriers, frequency, and routing based on cost and reliability targets.',
                'We run booking, documentation, and milestone control with continuous follow-up.',
                'We handle disruptions, keep stakeholders updated, and coordinate arrival at destination.'
            ],
            bestFor: [
                'Recurring import and export flows that require predictable execution.',
                'Full-container or consolidated cargo with international scale requirements.',
                'Operations that depend on tight coordination between sea and inland stages.'
            ]
        },
        es: {
            eyebrow: 'Flete Marítimo',
            title: 'Transporte marítimo con previsibilidad, protección de espacio y control integral',
            summary: 'Estructuramos embarques FCL, LCL y proyectos especiales con foco en estabilidad de booking, optimización de costos y visibilidad completa desde el origen hasta la entrega final.',
            highlights: ['FCL, LCL y carga proyecto', 'Protección de espacio con navieras aliadas', 'Gestión documental y tracking de hitos'],
            deliverables: [
                'Definición de la mejor combinación entre transit time, costo total y ruta internacional.',
                'Coordinación de booking, cut-off, stuffing, VGM, BL y eventos críticos de la operación.',
                'Seguimiento activo de transbordos, conexiones, ETA y excepciones durante todo el trayecto.',
                'Integración con recojo, almacenaje, despacho y entrega final cuando sea necesario.'
            ],
            process: [
                'Analizamos origen, destino, Incoterm, ventana de embarque y perfil de la carga.',
                'Seleccionamos navieras, frecuencia y ruta con el mejor equilibrio entre costo y confiabilidad.',
                'Ejecutamos booking, documentación y hitos operativos con monitoreo continuo.',
                'Gestionamos desvíos, informamos al cliente y coordinamos la llegada en destino.'
            ],
            bestFor: [
                'Importaciones y exportaciones recurrentes que requieren previsibilidad operacional.',
                'Cargas consolidadas o contenedores completos con necesidad de escala internacional.',
                'Operaciones que exigen coordinación fina entre la etapa marítima y la terrestre.'
            ]
        }
    },
    air: {
        icon: 'fa-solid fa-plane',
        pt: {
            eyebrow: 'Frete Aéreo',
            title: 'Transporte aéreo para cargas críticas, urgentes e sensíveis',
            summary: 'Montamos soluções aéreas com prioridade operacional, rotas competitivas e alto controle para cargas que não podem esperar ou exigem maior segurança e velocidade.',
            highlights: ['Consolidação premium e prioridade de embarque', 'Opções expressas e time-critical', 'Coordenação de cargas sensíveis e urgentes'],
            deliverables: [
                'Planejamento de embarques urgentes com escolha entre consolidação, direto ou serviço expresso.',
                'Gestão de reservas, documentação aérea, cut-offs e conexão com origem e destino.',
                'Monitoramento de voos, remarcações, conexões e contingências operacionais.',
                'Suporte para cargas de alto valor, sensíveis a tempo ou com requisitos específicos de manuseio.'
            ],
            process: [
                'Validamos urgência, tipo de carga, volumetria, aeroportos e restrições operacionais.',
                'Selecionamos a melhor malha aérea com base em prazo real, custo e confiabilidade.',
                'Coordenamos coleta, aceite, documentação e embarque junto aos parceiros envolvidos.',
                'Acompanhamos o voo até a entrega, informando eventos críticos e ações corretivas.'
            ],
            bestFor: [
                'Reposição urgente de estoque, peças críticas e cargas com alto impacto no negócio.',
                'Produtos com alto valor agregado ou grande sensibilidade a prazo.',
                'Operações que exigem resposta rápida e visibilidade operacional contínua.'
            ]
        },
        en: {
            eyebrow: 'Air Freight',
            title: 'Air freight for critical, urgent, and high-sensitivity cargo',
            summary: 'We design airfreight solutions with operational priority, competitive routing, and tight control for cargo that cannot wait or requires enhanced security and speed.',
            highlights: ['Premium consolidation and priority uplift', 'Express and time-critical options', 'Coordination for urgent and sensitive cargo'],
            deliverables: [
                'Urgent shipment planning with the right mix of consolidation, direct uplift, or express service.',
                'Air booking management, documentation control, cut-offs, and airport coordination.',
                'Flight monitoring, rebooking support, connection management, and contingency handling.',
                'Support for high-value cargo and shipments with specific handling requirements.'
            ],
            process: [
                'We validate urgency, cargo type, volume, airport pair, and operational restrictions.',
                'We select the best air network based on actual lead time, cost, and reliability.',
                'We coordinate pickup, airline acceptance, documentation, and uplift execution.',
                'We monitor the shipment through delivery and act quickly on critical deviations.'
            ],
            bestFor: [
                'Emergency replenishment, critical spare parts, and business-critical cargo.',
                'High-value products or shipments highly sensitive to lead time.',
                'Operations that demand speed, priority, and constant status visibility.'
            ]
        },
        es: {
            eyebrow: 'Flete Aéreo',
            title: 'Transporte aéreo para cargas críticas, urgentes y sensibles',
            summary: 'Diseñamos soluciones aéreas con prioridad operativa, rutas competitivas y alto control para cargas que no pueden esperar o requieren mayor seguridad y velocidad.',
            highlights: ['Consolidación premium y prioridad de embarque', 'Opciones express y time-critical', 'Coordinación de cargas urgentes y sensibles'],
            deliverables: [
                'Planificación de embarques urgentes con la mejor combinación entre consolidación, vuelo directo o servicio express.',
                'Gestión de reservas, documentación aérea, cut-offs y coordinación con origen y destino.',
                'Monitoreo de vuelos, reprogramaciones, conexiones y contingencias operativas.',
                'Soporte para cargas de alto valor o con requisitos específicos de manipulación.'
            ],
            process: [
                'Validamos urgencia, tipo de carga, volumetría, aeropuertos y restricciones operativas.',
                'Seleccionamos la mejor red aérea según plazo real, costo y confiabilidad.',
                'Coordinamos recojo, aceptación, documentación y embarque con los partners involucrados.',
                'Acompañamos el vuelo hasta la entrega, informando eventos críticos y acciones correctivas.'
            ],
            bestFor: [
                'Reposición urgente de stock, repuestos críticos y cargas de alto impacto comercial.',
                'Productos de alto valor agregado o muy sensibles al plazo.',
                'Operaciones que requieren respuesta rápida y visibilidad permanente.'
            ]
        }
    },
    road: {
        icon: 'fa-solid fa-truck-fast',
        pt: {
            eyebrow: 'Frete Rodoviário',
            title: 'Transporte rodoviário com coordenação transfronteiriça e controle da jornada',
            summary: 'Operamos fluxos rodoviários dedicados e consolidados com rastreabilidade, alinhamento documental e gestão próxima de coleta, trânsito e entrega.',
            highlights: ['Operações door-to-door e cross-border', 'Rastreamento e gestão de checkpoints', 'Sincronização com etapas portuárias e aduaneiras'],
            deliverables: [
                'Planejamento de coleta, trânsito, paradas operacionais e entrega final com janela definida.',
                'Gestão de documentação, instruções ao motorista e alinhamento com parceiros de fronteira.',
                'Monitoramento de rota, checkpoints, ocorrências e performance da viagem.',
                'Integração com etapas marítimas, aéreas, armazenagem ou despacho quando a operação exigir.'
            ],
            process: [
                'Mapeamos origem, destino, restrições de carga, fronteiras e exigências de tempo.',
                'Definimos veículo, rota, janelas operacionais e pontos críticos de controle.',
                'Executamos coleta e monitoramento contínuo com comunicação ativa ao cliente.',
                'Coordenamos a entrega final e tratamos ocorrências com rapidez e rastreabilidade.'
            ],
            bestFor: [
                'Operações regionais e cross-border com necessidade de flexibilidade e controle próximo.',
                'Conexões entre fábrica, porto, aeroporto, CD e cliente final.',
                'Fluxos que exigem visibilidade operacional durante todo o deslocamento.'
            ]
        },
        en: {
            eyebrow: 'Road Freight',
            title: 'Road freight with cross-border coordination and full journey control',
            summary: 'We operate dedicated and consolidated road flows with traceability, document alignment, and close management of pickup, transit, and final delivery.',
            highlights: ['Door-to-door and cross-border execution', 'Checkpoint tracking and route control', 'Synchronization with port and customs stages'],
            deliverables: [
                'Pickup, transit, stop planning, and final delivery execution with defined service windows.',
                'Document management, driver instructions, and alignment with border partners.',
                'Route monitoring, checkpoint control, incident management, and trip performance follow-up.',
                'Integration with sea, air, warehousing, or customs stages whenever the flow requires it.'
            ],
            process: [
                'We map origin, destination, cargo restrictions, border points, and timing requirements.',
                'We define equipment, route, operational windows, and critical control points.',
                'We execute pickup and continuous monitoring with active status communication.',
                'We coordinate final delivery and resolve incidents with speed and traceability.'
            ],
            bestFor: [
                'Regional and cross-border operations that need flexibility and close control.',
                'Connections between plant, port, airport, DC, and final customer.',
                'Flows that require real operational visibility throughout the movement.'
            ]
        },
        es: {
            eyebrow: 'Transporte Terrestre',
            title: 'Transporte terrestre con coordinación transfronteriza y control del trayecto',
            summary: 'Operamos flujos terrestres dedicados y consolidados con trazabilidad, alineación documental y gestión cercana del recojo, tránsito y entrega final.',
            highlights: ['Operaciones door-to-door y cross-border', 'Tracking y control de checkpoints', 'Sincronización con etapas portuarias y aduaneras'],
            deliverables: [
                'Planificación de recojo, tránsito, paradas operativas y entrega final con ventana definida.',
                'Gestión documental, instrucciones al conductor y coordinación con partners de frontera.',
                'Monitoreo de ruta, checkpoints, incidencias y desempeño del viaje.',
                'Integración con etapas marítimas, aéreas, almacenaje o despacho cuando la operación lo requiera.'
            ],
            process: [
                'Mapeamos origen, destino, restricciones de carga, fronteras y exigencias de tiempo.',
                'Definimos vehículo, ruta, ventanas operativas y puntos críticos de control.',
                'Ejecutamos el recojo y el monitoreo continuo con comunicación activa al cliente.',
                'Coordinamos la entrega final y tratamos incidencias con rapidez y trazabilidad.'
            ],
            bestFor: [
                'Operaciones regionales y cross-border que exigen flexibilidad y control cercano.',
                'Conexiones entre fábrica, puerto, aeropuerto, centro de distribución y cliente final.',
                'Flujos que requieren visibilidad operativa durante todo el trayecto.'
            ]
        }
    },
    customs: {
        icon: 'fa-solid fa-file-shield',
        pt: {
            eyebrow: 'Desembaraço Aduaneiro',
            title: 'Desembaraço aduaneiro com rigor documental e inteligência regulatória',
            summary: 'Atuamos para reduzir gargalos, mitigar riscos e acelerar liberações com preparação documental, leitura regulatória e coordenação próxima com todos os intervenientes da operação.',
            highlights: ['Compliance documental e regulatório', 'Coordenação com órgãos e parceiros', 'Redução de riscos, exigências e atrasos'],
            deliverables: [
                'Revisão de documentos, classificação, exigências e consistência da operação antes do registro.',
                'Coordenação entre importador, exportador, despachante, transportador e terminal.',
                'Acompanhamento de parametrizações, inspeções, exigências e etapas de liberação.',
                'Suporte preventivo para reduzir retrabalho, armazenagem extra e riscos de não conformidade.'
            ],
            process: [
                'Validamos documentos, enquadramento da mercadoria e requisitos regulatórios aplicáveis.',
                'Organizamos o dossiê operacional e alinhamos o fluxo com os agentes da cadeia.',
                'Acompanhamos registro, canal, inspeções e tratativas até a liberação da carga.',
                'Consolidamos status, pendências e próximos passos com comunicação objetiva ao cliente.'
            ],
            bestFor: [
                'Operações com alta exigência documental e necessidade de previsibilidade regulatória.',
                'Cargas sensíveis a atraso em porto, aeroporto ou fronteira.',
                'Empresas que buscam reduzir risco operacional e aumentar conformidade no processo.'
            ]
        },
        en: {
            eyebrow: 'Customs Clearance',
            title: 'Customs clearance with document rigor and regulatory intelligence',
            summary: 'We work to reduce bottlenecks, mitigate risk, and accelerate release by combining document preparation, regulatory interpretation, and close coordination across the entire chain.',
            highlights: ['Regulatory and document compliance', 'Coordination with authorities and partners', 'Lower risk of delays and exceptions'],
            deliverables: [
                'Review of documents, classification, requirements, and operational consistency before filing.',
                'Alignment among importer, exporter, broker, carrier, and terminal stakeholders.',
                'Monitoring of channel selection, inspection events, requirements, and release stages.',
                'Preventive support to reduce rework, extra storage costs, and non-compliance exposure.'
            ],
            process: [
                'We validate documents, product framing, and the applicable regulatory requirements.',
                'We organize the operational file and align the flow with all relevant parties.',
                'We follow filing, channel, inspections, and exception handling through final release.',
                'We consolidate status, pending items, and next actions with clear client communication.'
            ],
            bestFor: [
                'Operations with high documentary complexity and regulatory sensitivity.',
                'Cargo exposed to delay risk at port, airport, or border environments.',
                'Companies seeking stronger compliance and lower operational exposure.'
            ]
        },
        es: {
            eyebrow: 'Despacho Aduanero',
            title: 'Despacho aduanero con rigor documental e inteligencia regulatoria',
            summary: 'Actuamos para reducir cuellos de botella, mitigar riesgos y acelerar liberaciones mediante preparación documental, lectura regulatoria y coordinación cercana con todos los actores de la operación.',
            highlights: ['Cumplimiento documental y regulatorio', 'Coordinación con autoridades y partners', 'Menor riesgo de demoras y exigencias'],
            deliverables: [
                'Revisión de documentos, clasificación, requisitos y consistencia operativa antes del registro.',
                'Coordinación entre importador, exportador, despachante, transportista y terminal.',
                'Seguimiento de canal, inspecciones, requerimientos y etapas de liberación.',
                'Soporte preventivo para reducir retrabajos, almacenaje extra y exposición a no conformidades.'
            ],
            process: [
                'Validamos documentos, encuadre de la mercadería y requisitos regulatorios aplicables.',
                'Organizamos el expediente operativo y alineamos el flujo con todos los intervinientes.',
                'Acompañamos registro, canal, inspecciones y gestiones hasta la liberación final.',
                'Consolidamos status, pendientes y próximos pasos con comunicación clara al cliente.'
            ],
            bestFor: [
                'Operaciones con alta exigencia documental y sensibilidad regulatoria.',
                'Cargas expuestas a demoras en puerto, aeropuerto o frontera.',
                'Empresas que buscan mayor conformidad y menor riesgo operativo.'
            ]
        }
    }
};

function populateServiceModalList(element, items) {
    element.innerHTML = '';
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        element.appendChild(listItem);
    });
}

function renderServiceModal(serviceKey) {
    if (!serviceModal || !serviceModalContent[serviceKey]) return;

    const modalCopy = serviceModalContent[serviceKey][currentLanguage];
    const modalUi = serviceModalUI[currentLanguage];

    activeServiceModal = serviceKey;
    serviceModalIcon.className = serviceModalContent[serviceKey].icon;
    serviceModalEyebrow.textContent = modalCopy.eyebrow;
    serviceModalTitle.textContent = modalCopy.title;
    serviceModalSummary.textContent = modalCopy.summary;
    serviceModalScopeTitle.textContent = modalUi.scopeTitle;
    serviceModalProcessTitle.textContent = modalUi.processTitle;
    serviceModalBestForTitle.textContent = modalUi.bestForTitle;
    serviceModalNote.textContent = modalUi.note;
    serviceModalCta.innerHTML = modalUi.cta;

    if (serviceModalCloseButton) {
        serviceModalCloseButton.setAttribute('aria-label', modalUi.close);
    }

    serviceModalHighlights.innerHTML = '';
    modalCopy.highlights.forEach(highlight => {
        const badge = document.createElement('div');
        badge.className = 'service-modal-highlight';
        badge.textContent = highlight;
        serviceModalHighlights.appendChild(badge);
    });

    populateServiceModalList(serviceModalDeliverables, modalCopy.deliverables);
    populateServiceModalList(serviceModalProcess, modalCopy.process);
    populateServiceModalList(serviceModalBestFor, modalCopy.bestFor);
}

function openServiceModal(serviceKey) {
    if (!serviceModal || !serviceModalContent[serviceKey]) return;

    renderServiceModal(serviceKey);
    if (serviceModalDialog) {
        serviceModalDialog.scrollTop = 0;
    }
    document.body.classList.add('modal-open');
    serviceModal.classList.add('is-open');
    serviceModal.setAttribute('aria-hidden', 'false');
}

function closeServiceModal() {
    if (!serviceModal) return;

    document.body.classList.remove('modal-open');
    serviceModal.classList.remove('is-open');
    serviceModal.setAttribute('aria-hidden', 'true');
}

serviceModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => openServiceModal(trigger.dataset.service));
});

anchorLinks.forEach(link => {
    const targetId = link.getAttribute('href');

    if (!targetId || targetId === '#') return;

    link.addEventListener('click', (event) => {
        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        scrollToAnchor(targetId);
    });
});

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        if (mobileNav?.classList.contains('is-open')) {
            closeMobileMenu();
            return;
        }

        openMobileMenu();
    });
}

mobileNavCloseElements.forEach(element => {
    element.addEventListener('click', closeMobileMenu);
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

serviceModalCloseElements.forEach(element => {
    element.addEventListener('click', closeServiceModal);
});

document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    if (serviceModal?.classList.contains('is-open')) {
        closeServiceModal();
    }

    if (mobileNav?.classList.contains('is-open')) {
        closeMobileMenu();
    }
});

if (serviceModalCta) {
    serviceModalCta.addEventListener('click', closeServiceModal);
}

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX; const posY = e.clientY;
    
    // Dot segue imediatamente
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    // Outline usa GSAP para um leve atraso (smooth)
    gsap.to(cursorOutline, {
        x: posX, y: posY, duration: 0.15, ease: "power2.out"
    });
});

interactables.forEach(el => {
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('cursor-hover'));
});

// --- 2. Preloader & Initialize GSAP ---
window.addEventListener('load', () => {
    gsap.to('#loader-bar', { width: '100%', duration: 1.5, ease: "power2.inOut" });
    
    setTimeout(() => {
        gsap.to('#preloader', { y: '-100%', duration: 0.8, ease: "power3.inOut" });
        initAnimations();
    }, 1600);
});

// --- 3. Split Text Helper (Substituto nativo para SplitText) ---
function splitTextIntoWords() {
    const elements = document.querySelectorAll('.split-text');
    elements.forEach(el => {
        const text = el.innerText;
        const i18nAttr = el.getAttribute('data-i18n'); // Salvar o attr
        const words = text.split(' ');
        el.innerHTML = '';
        if(i18nAttr) el.setAttribute('data-i18n', i18nAttr); // Repor no pai

        words.forEach(word => {
            // Ignora tags HTML se existissem, mas aqui lidamos com texto simples
            const wrapper = document.createElement('span');
            wrapper.classList.add('word-line');
            const inner = document.createElement('span');
            inner.classList.add('word');
            inner.innerText = word + '\u00A0'; // Adiciona espaço non-breaking
            
            wrapper.appendChild(inner);
            el.appendChild(wrapper);
        });
    });
}

function splitTextIntoWords() {
    const elements = document.querySelectorAll('.split-text');
    elements.forEach(el => {
        const rawHtml = el.innerHTML;
        const i18nAttr = el.getAttribute('data-i18n');
        const lineFragments = rawHtml.split(/<br\s*\/?>/gi);
        el.innerHTML = '';

        if (i18nAttr) {
            el.setAttribute('data-i18n', i18nAttr);
        }

        const parsedLines = lineFragments
            .map(lineHtml => {
                const temp = document.createElement('div');
                temp.innerHTML = lineHtml;

                return (temp.textContent || temp.innerText || '')
                    .replace(/\u00A0/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();
            })
            .filter(Boolean);

        parsedLines.forEach((lineText, lineIndex) => {
            const words = lineText.split(' ').filter(Boolean);

            words.forEach((word, wordIndex) => {
                const wrapper = document.createElement('span');
                wrapper.classList.add('word-line');
                const inner = document.createElement('span');
                inner.classList.add('word');
                inner.innerText = word + (wordIndex < words.length - 1 ? '\u00A0' : '');

                wrapper.appendChild(inner);
                el.appendChild(wrapper);
            });

            if (lineIndex < parsedLines.length - 1) {
                el.appendChild(document.createElement('br'));
            }
        });
    });
}

// --- 4. GSAP Animations ---
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
    splitTextIntoWords();

    // Header Background
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');

        updateActiveNavLink();
    });

    window.addEventListener('resize', () => {
        updateActiveNavLink();

        if (window.innerWidth > 992 && mobileNav?.classList.contains('is-open')) {
            closeMobileMenu();
        }
    });
    updateActiveNavLink();
    initClientsCarousel();

    // Hero Animations
    gsap.to(".hero-bg", {
        y: "30%", ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true }
    });

    // CORREÇÃO: Usando gsap.fromTo especificamente para os elementos dentro do #hero
    gsap.fromTo("#hero .word", 
        { y: "100%" }, 
        { y: "0%", duration: 1, stagger: 0.1, ease: "power4.out" }
    );
    gsap.fromTo("#hero .gs-fade-up", 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.5 }
    );
    gsap.fromTo(".hero-stat-box.gs-fade-left", 
        { x: 100, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1 }
    );

    // Global Scroll Animations
    const sections = ['#services', '#about', '#why-mm', '#clients', '#contact'];
    
    sections.forEach(sec => {
        // Títulos - CORREÇÃO: Passando de from para fromTo
        gsap.fromTo(`${sec} .word`, 
            { y: "100%" },
            {
                scrollTrigger: { trigger: sec, start: "top 85%" },
                y: "0%", duration: 0.8, stagger: 0.05, ease: "power3.out"
            }
        );
        
        // Elementos fade up - CORREÇÃO: Passando de from para fromTo
        gsap.fromTo(`${sec} .gs-fade-up`, 
            { y: 50, opacity: 0 },
            {
                scrollTrigger: { trigger: sec, start: "top 85%" },
                y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out"
            }
        );
    });

    // Parallax Imagem About
    gsap.to(".gs-parallax-img", {
        y: "20%", ease: "none",
        scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: true }
    });

    // Mapa Scale - CORREÇÃO: fromTo
    gsap.fromTo(".gs-scale-up", 
        { scale: 0.8, opacity: 0 },
        {
            scrollTrigger: { trigger: "#why-mm .why-network-block", start: "top 82%" },
            scale: 1, opacity: 1, duration: 1, ease: "power3.out"
        }
    );

    // Contadores
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        ScrollTrigger.create({
            trigger: counter,
            start: "top 85%",
            onEnter: () => {
                gsap.to(counter, {
                    innerText: target, duration: 2, snap: { innerText: 1 }, ease: "power1.out"
                });
            },
            once: true
        });
    });
}

// --- 5. Multilingual System ---
const translations = {
    pt: {
        "nav-home": "Início", "nav-services": "Serviços", "nav-about": "Sobre", "nav-why": "Porque MM?", "nav-clients": "Clientes", "nav-network": "Rede", "nav-contact": "Contato",
        "hero-title": "Al&eacute;m das Fronteiras.<br>Sem Limites.",
        "hero-desc": "Engenharia de suprimentos e otimização de rotas e custos logísticos pra melhorar a rentabilidade da sua operação.",
        "btn-quote": "Solicitar Or&ccedil;amento <i class='fa-solid fa-arrow-right'></i>",
        "hero-stat": "Países Conectados",
        "services-sub": "Expertise Logística", "services-title": "Soluções Globais",
        "srv-sea-title": "Frete Marítimo", "srv-sea-desc": "Nem sempre o caminho mais longo precisa ser o mais complicado. Cuidamos da sua carga no mar com planejamento e atenção em cada detalhe, para que você tenha previsibilidade do início ao fim.",
        "srv-air-title": "Frete Aéreo", "srv-air-desc": "Quando o tempo é decisivo, cada minuto conta. Garantimos que sua carga chegue no momento certo, com agilidade, experiência e total segurança.",
        "srv-land-title": "Frete Rodoviário", "srv-land-desc": "Do início ao destino final, sua operação é conduzida com acompanhamento contínuo, garantindo segurança, previsibilidade e eficiência.",
        "srv-customs-title": "Desembaraço Aduaneiro", "srv-customs-desc": "A burocracia não precisa ser um problema para você. Cuidamos de todo o processo para que sua carga siga sem atrasos e sem surpresas.",
        "btn-learn": "Saiba Mais <i class='fa-solid fa-arrow-right'></i>",
        "about-sub": "Nossa Essência", "about-title": "A Nova Era da Logística",
        "about-p1": "Não somos apenas transitários. Somos arquitetos de cadeias de suprimentos. Combinamos tecnologia de ponta, análise de dados e décadas de inteligência de mercado para simplificar o complexo.",
        "about-p2": "Da origem ao destino, garantimos visibilidade total, mitigação de riscos e otimização de custos operacionais.",
        "stat-years": "Anos no Mercado", "stat-ops": "Embarques Realizados",
        "why-sub": "Diferenciais Estratégicos", "why-title": "Por que escolher a MM Logistics como seu aliado?", "why-lead": "Uma estrutura de suporte pensada para dar previsibilidade, acelerar decisões e proteger a rentabilidade da sua operação.",
        "why-1-title": "Acompanhamento próximo", "why-1-desc": "Estamos ao seu lado em cada etapa da operação, garantindo controle, agilidade e respostas rápidas quando você precisa.",
        "why-2-title": "Otimização de custos", "why-2-desc": "Buscamos as melhores soluções para tornar sua logística mais eficiente, sem comprometer a qualidade e a segurança.",
        "why-3-title": "Assessoria personalizada", "why-3-desc": "Cada operação é única. Por isso, entendemos sua necessidade e desenhamos soluções sob medida para o seu negócio.",
        "why-4-title": "Experiência comprovada", "why-4-desc": "Atuamos com conhecimento prático e visão estratégica para garantir resultados consistentes e confiáveis.",
        "clients-sub": "CLIENTES", "clients-title": "O que nossos clientes dizem...",
        "clients-desc": "Operações exigentes pedem parceiros com execução consistente. Aqui estão alguns relatos que representam esse padrão.",
        "client-1-quote": "A equipe da MM Logistics nos deu visibilidade e agilidade em uma operação sensível entre Paraguai e Brasil. O acompanhamento foi impecável.",
        "client-1-role": "Gerente de Supply Chain, Agrovia Foods",
        "client-2-quote": "Conseguimos reduzir custos sem perder previsibilidade. A comunicação é rápida, objetiva e sempre muito próxima.",
        "client-2-role": "Diretor de Operações, Mercosur Foods",
        "client-3-quote": "Tínhamos uma operação urgente e a MM Logistics assumiu com segurança do início ao fim. O nível de resposta realmente faz diferença.",
        "client-3-role": "Coordenadora de Importação, NovaMed",
        "client-4-quote": "O diferencial está na assessoria personalizada. Eles entendem o negócio antes de propor a melhor rota para a operação.",
        "client-4-role": "Gerente Comercial, Andina Parts",
        "client-5-quote": "Mais do que um fornecedor logístico, a MM Logistics virou um parceiro estratégico para nossas exportações na região.",
        "client-5-role": "CEO, Atlas Commodities",
        "network-sub": "Alcance Global", "network-title": "Presença Mundial", "network-desc": "Hubs estratégicos operando nos principais portos e aeroportos do mundo.",
        "contact-title": "Pronto para Embarcar?", "contact-desc": "Converse com nossos especialistas e construa a rota perfeita para seu negócio e <span class='contact-highlight'>atenderemos você de forma imediata</span>.",
        "btn-whatsapp": "<i class='fa-brands fa-whatsapp' style='font-size: 1.2rem;'></i> Falar no WhatsApp Agora",
        "contact-email": "mavendano@mmlogistics.com.py", "contact-address": "Global Logistics HUB",
        "footer-rights": "Todos os direitos reservados."
    },
    en: {
        "nav-home": "Home", "nav-services": "Services", "nav-about": "About", "nav-why": "Why MM?", "nav-clients": "Clients", "nav-network": "Network", "nav-contact": "Contact",
        "hero-title": "Beyond Borders.<br>Beyond Limits.",
        "hero-desc": "Supply chain engineering with route and logistics cost optimization to improve the profitability of your operation.",
        "btn-quote": "Request a Quote <i class='fa-solid fa-arrow-right'></i>",
        "hero-stat": "Countries Connected",
        "services-sub": "Logistics Expertise", "services-title": "Global Solutions",
        "srv-sea-title": "Ocean Freight", "srv-sea-desc": "The longest route does not have to be the most complicated. We manage your cargo at sea with planning and attention to every detail, so you have predictability from start to finish.",
        "srv-air-title": "Air Freight", "srv-air-desc": "When time is decisive, every minute counts. We make sure your cargo arrives at the right moment, with agility, experience, and total security.",
        "srv-land-title": "Road Freight", "srv-land-desc": "From origin to final destination, your operation is managed with continuous follow-up, ensuring security, predictability, and efficiency.",
        "srv-customs-title": "Customs Clearance", "srv-customs-desc": "Bureaucracy does not need to be a problem for you. We handle the entire process so your cargo keeps moving without delays or surprises.",
        "btn-learn": "Learn More <i class='fa-solid fa-arrow-right'></i>",
        "about-sub": "Our Essence", "about-title": "The New Era of Logistics",
        "about-p1": "We are not just freight forwarders. We are supply chain architects. We combine cutting-edge tech, data analytics, and decades of market intelligence to simplify the complex.",
        "about-p2": "From origin to destination, we ensure total visibility, risk mitigation, and operational cost optimization.",
        "stat-years": "Years in Market", "stat-ops": "Shipments Completed",
        "why-sub": "Strategic Advantages", "why-title": "Why choose MM Logistics as your ally?", "why-lead": "A support structure designed to bring predictability, speed up decisions, and protect the profitability of your operation.",
        "why-1-title": "Close follow-up", "why-1-desc": "We stay by your side at every stage of the operation, ensuring control, agility, and fast responses when you need them.",
        "why-2-title": "Cost optimization", "why-2-desc": "We look for the best solutions to make your logistics more efficient without compromising quality or security.",
        "why-3-title": "Personalized advisory", "why-3-desc": "Every operation is unique. That is why we understand your needs and design tailored solutions for your business.",
        "why-4-title": "Proven experience", "why-4-desc": "We operate with practical knowledge and strategic vision to deliver consistent and reliable results.",
        "clients-sub": "CLIENTS", "clients-title": "What our clients say...",
        "clients-desc": "Demanding operations require partners with consistent execution. Here are a few testimonials that reflect that standard.",
        "client-1-quote": "The MM Logistics team gave us visibility and agility in a sensitive operation between Paraguay and Brazil. The follow-up was impeccable.",
        "client-1-role": "Supply Chain Manager, Agrovia Foods",
        "client-2-quote": "We managed to reduce costs without losing predictability. Communication is fast, objective, and always close to the operation.",
        "client-2-role": "Operations Director, Mercosur Foods",
        "client-3-quote": "We had an urgent operation, and MM Logistics took ownership with confidence from start to finish. Their response level really makes a difference.",
        "client-3-role": "Import Coordinator, NovaMed",
        "client-4-quote": "The difference is in the personalized advisory. They understand the business before proposing the best route for the operation.",
        "client-4-role": "Commercial Manager, Andina Parts",
        "client-5-quote": "More than a logistics provider, MM Logistics became a strategic partner for our exports across the region.",
        "client-5-role": "CEO, Atlas Commodities",
        "network-sub": "Global Reach", "network-title": "Worldwide Presence", "network-desc": "Strategic hubs operating in major ports and airports around the world.",
        "contact-title": "Ready to Ship?", "contact-desc": "Talk to our specialists and build the perfect route for your business, and <span class='contact-highlight'>we will assist you immediately</span>.",
        "btn-whatsapp": "<i class='fa-brands fa-whatsapp' style='font-size: 1.2rem;'></i> Chat on WhatsApp Now",
        "contact-email": "mavendano@mmlogistics.com.py", "contact-address": "Global Logistics HUB",
        "footer-rights": "All rights reserved."
    },
    es: {
        "nav-home": "Inicio", "nav-services": "Servicios", "nav-about": "Nosotros", "nav-why": "¿Por qué MM?", "nav-clients": "Clientes", "nav-network": "Red", "nav-contact": "Contacto",
        "hero-title": "M&aacute;s All&aacute; de las Fronteras.<br>Sin L&iacute;mites.",
        "hero-desc": "Ingeniería de cadena de suministro y optimización de rutas y costos logísticos para mejorar la rentabilidad de su operación.",
        "btn-quote": "Solicitar Cotizaci&oacute;n <i class='fa-solid fa-arrow-right'></i>",
        "hero-stat": "Países Conectados",
        "services-sub": "Experiencia Logística", "services-title": "Soluciones Globales",
        "srv-sea-title": "Flete Marítimo", "srv-sea-desc": "No siempre el camino más largo tiene que ser el más complicado. Cuidamos su carga en el mar con planificación y atención en cada detalle, para que tenga previsibilidad de principio a fin.",
        "srv-air-title": "Flete Aéreo", "srv-air-desc": "Cuando el tiempo es decisivo, cada minuto cuenta. Garantizamos que su carga llegue en el momento correcto, con agilidad, experiencia y total seguridad.",
        "srv-land-title": "Transporte Terrestre", "srv-land-desc": "Desde el origen hasta el destino final, su operación se conduce con seguimiento continuo, garantizando seguridad, previsibilidad y eficiencia.",
        "srv-customs-title": "Despacho Aduanero", "srv-customs-desc": "La burocracia no tiene por qué ser un problema para usted. Nos ocupamos de todo el proceso para que su carga siga sin retrasos ni sorpresas.",
        "btn-learn": "Saber Más <i class='fa-solid fa-arrow-right'></i>",
        "about-sub": "Nuestra Esencia", "about-title": "La Nueva Era de la Logística",
        "about-p1": "No somos solo transitarios. Somos arquitectos de cadenas de suministro. Combinamos tecnología punta y décadas de inteligencia de mercado para simplificar lo complejo.",
        "about-p2": "Desde el origen hasta el destino, garantizamos visibilidad total, mitigación de riesgos y optimización de costos.",
        "stat-years": "Años en el Mercado", "stat-ops": "Embarques Realizados",
        "why-sub": "Ventajas Estratégicas", "why-title": "¿Por qué elegir a MM Logistics como su aliado?", "why-lead": "Una estructura de soporte pensada para aportar previsibilidad, acelerar decisiones y proteger la rentabilidad de su operación.",
        "why-1-title": "Seguimiento cercano", "why-1-desc": "Estamos a su lado en cada etapa de la operación, garantizando control, agilidad y respuestas rápidas cuando las necesita.",
        "why-2-title": "Optimización de costos", "why-2-desc": "Buscamos las mejores soluciones para hacer su logística más eficiente, sin comprometer la calidad ni la seguridad.",
        "why-3-title": "Asesoría personalizada", "why-3-desc": "Cada operación es única. Por eso, entendemos su necesidad y diseñamos soluciones a medida para su negocio.",
        "why-4-title": "Experiencia comprobada", "why-4-desc": "Actuamos con conocimiento práctico y visión estratégica para garantizar resultados consistentes y confiables.",
        "clients-sub": "CLIENTES", "clients-title": "Lo que dicen nuestros clientes...",
        "clients-desc": "Las operaciones exigentes necesitan socios con ejecución consistente. Aquí tiene algunos testimonios que reflejan ese estándar.",
        "client-1-quote": "El equipo de MM Logistics nos dio visibilidad y agilidad en una operación sensible entre Paraguay y Brasil. El seguimiento fue impecable.",
        "client-1-role": "Gerente de Supply Chain, Agrovia Foods",
        "client-2-quote": "Logramos reducir costos sin perder previsibilidad. La comunicación es rápida, objetiva y siempre muy cercana.",
        "client-2-role": "Director de Operaciones, Mercosur Foods",
        "client-3-quote": "Teníamos una operación urgente y MM Logistics la asumió con seguridad de principio a fin. Su nivel de respuesta realmente marca la diferencia.",
        "client-3-role": "Coordinadora de Importación, NovaMed",
        "client-4-quote": "La diferencia está en la asesoría personalizada. Entienden el negocio antes de proponer la mejor ruta para la operación.",
        "client-4-role": "Gerente Comercial, Andina Parts",
        "client-5-quote": "Más que un proveedor logístico, MM Logistics se convirtió en un socio estratégico para nuestras exportaciones en la región.",
        "client-5-role": "CEO, Atlas Commodities",
        "network-sub": "Alcance Global", "network-title": "Presencia Mundial", "network-desc": "Hubs estratégicos operando en los principales puertos y aeropuertos del mundo.",
        "contact-title": "¿Listo para Embarcar?", "contact-desc": "Hable con nuestros especialistas y construya la ruta perfecta para su negocio, y <span class='contact-highlight'>le atenderemos de forma inmediata</span>.",
        "btn-whatsapp": "<i class='fa-brands fa-whatsapp' style='font-size: 1.2rem;'></i> Hablar por WhatsApp",
        "contact-email": "mavendano@mmlogistics.com.py", "contact-address": "HUB Logístico Global",
        "footer-rights": "Todos los derechos reservados."
    }
};

function getStoredLanguagePreference() {
    try {
        const storedLanguage = window.localStorage.getItem(languageStorageKey);
        return supportedLanguages.includes(storedLanguage) ? storedLanguage : null;
    } catch (error) {
        return null;
    }
}

function saveLanguagePreference(lang) {
    try {
        window.localStorage.setItem(languageStorageKey, lang);
    } catch (error) {
        // Ignore storage restrictions
    }
}

function detectPreferredLanguage() {
    const browserLanguages = Array.isArray(navigator.languages) && navigator.languages.length
        ? navigator.languages
        : [navigator.language || navigator.userLanguage || ''];

    for (const locale of browserLanguages) {
        const normalizedLocale = String(locale).toLowerCase();

        if (normalizedLocale.startsWith('pt')) return 'pt';
        if (normalizedLocale.startsWith('es')) return 'es';
        if (normalizedLocale.startsWith('en')) return 'en';
    }

    return 'pt';
}

function applyInitialLanguage() {
    const storedLanguage = getStoredLanguagePreference();
    const initialLanguage = storedLanguage || detectPreferredLanguage();

    changeLanguage(initialLanguage, {
        persist: false,
        animateSplitText: false,
        refreshScrollTrigger: false,
        closeMobileNavigation: false
    });
}

function changeLanguage(lang, options = {}) {
    if (!supportedLanguages.includes(lang) || !translations[lang]) return;

    const {
        persist = true,
        animateSplitText = true,
        refreshScrollTrigger = true,
        closeMobileNavigation = true
    } = options;

    currentLanguage = lang;
    document.documentElement.lang = documentLanguageMap[lang] || 'pt-BR';
    const elements = document.querySelectorAll('[data-i18n]');
    
    // Refazer o html original sem os spans do split-text temporariamente para traduzir limpo
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key]; // Substitui texto
        }
    });

    // Re-aplicar o split-text após tradução se for título
    splitTextIntoWords(); 
    
    // Re-animar os textos novos (opcional, para dar efeito de troca)
    if (animateSplitText) {
        gsap.fromTo(".split-text .word", 
            { y: "100%" }, 
            { y: "0%", duration: 0.5, stagger: 0.05, ease: "power2.out" }
        );
    }

    // Atualiza botões
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === lang) {
            btn.classList.add('active');
        }
    });

    if (persist) {
        saveLanguagePreference(lang);
    }

    if (serviceModal?.classList.contains('is-open') && activeServiceModal) {
        renderServiceModal(activeServiceModal);
    }

    if (closeMobileNavigation && mobileNav?.classList.contains('is-open')) {
        closeMobileMenu();
    }
    
    if (refreshScrollTrigger) {
        setTimeout(() => ScrollTrigger.refresh(), 200);
    }
}

applyInitialLanguage();
