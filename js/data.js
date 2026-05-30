/**
 * portfolio-bts - Fichier de données (data.js)
 * Personnalisé spécifiquement avec les travaux, projets et cours réels d'Ilyass Daoudi.
 */

const portfolioData = {
    personalInfo: {
        firstName: "Ilyass",
        lastName: "Daoudi",
        title: "Étudiant en BTS SIO",
        subtitle: "Services Informatiques aux Organisations - Spécialisation SISR",
        email: "pro.ilyassdaoudi@gmail.com",
        github: "https://github.com/ilyass-daoudi",
        linkedin: "https://linkedin.com/in/ilyass-daoudi",
        location: "France",
        aboutText: "Actuellement en première année de BTS Services Informatiques aux Organisations (SIO), je me spécialise en administration des systèmes, réseaux et cybersécurité (SISR). Passionné par l'architecture des infrastructures informatiques, la sécurité et l'automatisation, j'acquiers au quotidien des compétences solides pour concevoir, configurer et administrer des réseaux et serveurs d'entreprise résilients et sécurisés.",
        cvUrl: "assets/Tableau_Synthese_Ilyass_Daoudi.pdf"
    },
    
    // Définition des blocs de compétences du référentiel BTS SIO
    competences: {
        // Bloc 1 : Commun à tous les étudiants de 1ère année
        bloc1: {
            title: "Bloc 1 : Support et mise à disposition de services informatiques",
            description: "Compétences communes de gestion du patrimoine, traitement des incidents et gestion de projets.",
            skills: [
                { name: "Gérer le patrimoine informatique", level: 85, detail: "Inventaire automatisé et suivi de parc sous GLPI, gestion des configurations et plans de sauvegarde." },
                { name: "Répondre aux incidents", level: 80, detail: "Support utilisateur, diagnostic de pannes matérielles/logicielles et traitement de tickets d'assistance." },
                { name: "Développer la présence en ligne", level: 75, detail: "Création et modification de sites web, notions de référencement (SEO), et sécurité web de base." },
                { name: "Travailler en mode projet", level: 85, detail: "Planification des tâches (Gantt), gestion de versions avec Git/GitHub et travail collaboratif." },
                { name: "Mettre à disposition un service", level: 80, detail: "Déploiement d'applications locales, configuration de serveurs web sécurisés (Apache2, Nginx) et gestion des logs." }
            ]
        },
        
        // Bloc 2 option SISR (Réseaux & Systèmes) - Option principale d'Ilyass
        sisr: {
            title: "Bloc 2 : Administration des systèmes et des réseaux (SISR)",
            description: "Spécialisation dans la configuration des équipements réseaux, l'administration serveur et la sécurité.",
            skills: [
                { name: "Administration Systèmes Windows & Linux", level: 80, detail: "Gestion Active Directory (AD DS, DNS, DHCP, GPO, PSO) et administration de serveurs Linux Debian/Ubuntu." },
                { name: "Configuration Réseau & VoIP (Cisco)", level: 85, detail: "VLANs, routage inter-VLAN, adressage VLSM, protocoles de routage (OSPF, EIGRP) et téléphonie sur IP (CME)." },
                { name: "Sécurisation des infrastructures", level: 75, detail: "Cloisonnement réseau par listes de contrôle d'accès (ACL Cisco), modèle de droits AGDLP, et haute disponibilité (CARP/pfsync)." },
                { name: "Supervision et sauvegarde", level: 75, detail: "Configuration de serveurs de logs (Syslog), stratégies de sauvegarde (3-2-1) et scripting système (PowerShell, Bash)." }
            ]
        }
    },
    
    // Réalisations réelles d'Ilyass Daoudi issues de ses dossiers de TP
    projects: [
        {
            id: 1,
            title: "Installation et sécurisation d'un serveur GLPI sous Debian 12",
            description: "Déploiement complet d'un serveur d'assistance et de gestion de parc informatique en pile LAMP (Apache, PHP, MySQL) en suivant les bonnes pratiques de sécurité.",
            longDescription: "Mise en place pas à pas d'un serveur d'assistance GLPI sous Linux Debian. Ce projet a englobé l'installation de la pile LAMP, la sécurisation du serveur SQL (mysql_secure_installation), la création et l'octroi des privilèges de base de données. Pour assurer une sécurité optimale selon les recommandations de l'éditeur, j'ai configuré un VirtualHost Apache redirigeant les connexions vers le sous-répertoire `/public` afin d'isoler les fichiers système sensibles, activé le module de réécriture (`mod_rewrite`) et configuré les droits d'accès système adéquats (chown www-data, chmod 755).",
            context: "Activité Pratique (THEO SUPPORT)",
            category: "common",
            tags: ["GLPI v10", "Debian 12", "LAMP Stack", "Apache VirtualHost", "Sécurité"],
            skillsLinked: ["Gérer le patrimoine informatique", "Mettre à disposition un service", "Répondre aux incidents"],
            image: "assets/project_glpi.jpg"
        },
        {
            id: 2,
            title: "Déploiement d'une maquette Active Directory (Domaine ilyess.local)",
            description: "Préparation et déploiement d'un contrôleur de domaine Windows Server avec les services DNS et DHCP pour centraliser l'authentification réseau.",
            longDescription: "Mise en œuvre d'une maquette d'infrastructure réseau d'entreprise sous VirtualBox. Après avoir configuré une adresse IP fixe stable sur Windows Server (cruciale pour éviter les pannes de résolution de noms), j'ai déployé les rôles AD DS et DNS pour créer le domaine local 'ilyess.local'. J'ai ensuite configuré le service DHCP avec une plage d'adressage dynamique et des réservations statiques par adresse MAC pour des postes clients Linux Debian afin de stabiliser et centraliser l'attribution d'adresses réseau.",
            context: "Activité Contrôle (THEO SUPPORT)",
            category: "sisr",
            tags: ["Windows Server", "Active Directory", "DNS / DHCP", "Virtualisation", "Postes clients"],
            skillsLinked: ["Administration Systèmes Windows & Linux", "Gérer le patrimoine informatique"],
            image: "assets/project_ad.jpg"
        },
        {
            id: 3,
            title: "Cloisonnement des accès réseau (Modèle AGDLP et PSO)",
            description: "Organisation de la sécurité des données sur le domaine Active Directory en appliquant le modèle de rôles AGDLP et des stratégies de mots de passe fines (PSO).",
            longDescription: "Création d'une structure logique d'entreprise au sein d'Active Directory en configurant des Unités d'Organisation (UO) pour les services technique, administration et direction. J'ai configuré des utilisateurs nominatifs (ilyess.technique, ilyess.admin, ilyess.direction) et appliqué la méthodologie recommandée par Microsoft : AGDLP (Comptes dans des Groupes Globaux, membres de Groupes Locaux de Domaine, disposant de Permissions spécifiques). Enfin, j'ai implémenté un PSO (Password Settings Object) afin d'exiger des règles de complexité de mots de passe plus élevées sur les comptes sensibles du domaine sans impacter les utilisateurs standards.",
            context: "Activité Contrôle (THEO SUPPORT)",
            category: "sisr",
            tags: ["Active Directory", "Modèle AGDLP", "Sécurité PSO", "Unités d'Organisation"],
            skillsLinked: ["Administration Systèmes Windows & Linux", "Sécurisation des infrastructures"],
            image: "assets/project_agdlp.jpg"
        },
        {
            id: 4,
            title: "Simulation de Téléphonie sur IP (VoIP) Cisco CME",
            description: "Configuration de commutateurs et routeurs en CLI Packet Tracer pour acheminer et gérer des flux VoIP (VLAN Voix et CallManager Express).",
            longDescription: "Conception complète d'un réseau de téléphonie sur IP sous Cisco Packet Tracer. J'ai configuré un routeur Cisco en ligne de commande (CLI) pour héberger le service CallManager Express (CME) : attribution d'IP, configuration d'un pool DHCP VOIP incluant l'option 150 (SCCP pour TFTP) afin que les téléphones récupèrent leur configuration, et création de lignes virtuelles internes (ephone-dn 1 et 2) avec attribution de numéros (001, 002). Sur le commutateur intermédiaire, j'ai configuré l'intégralité des ports en VLAN voix (switchport voice vlan 1) afin de séparer les flux et de valider les appels inter-postes en environnement virtuel.",
            context: "Activité Réseau (Cisco Labs)",
            category: "sisr",
            tags: ["Cisco CLI", "VoIP (CME)", "DHCP Option 150", "VLAN Voix", "Packet Tracer"],
            skillsLinked: ["Configuration Réseau & VoIP (Cisco)", "Mettre à disposition un service"],
            image: "assets/project_voip.jpg"
        },
        {
            id: 5,
            title: "Support et Gestion de Parc (Département de l'Hérault)",
            description: "Gestion des incidents et du parc informatique via GLPI, rédaction de procédures techniques et participation aux réunions daily.",
            longDescription: "Au sein du Pôle des systèmes d'information du Département de l'Hérault, j'ai assuré la gestion des tickets d'incidents et des appels d'urgence des utilisateurs via l'outil GLPI. J'ai eu la charge de gérer le parc informatique (ajout, modification et suppression de matériels). Afin de capitaliser les connaissances, j'ai rédigé des procédures pour la résolution de tickets, la masterisation et le déploiement des postes. J'ai également assisté aux réunions 'daily' pour le suivi de l'avancement des projets et participé activement à la migration de l'ancien outil de ticketing vers GLPI.",
            context: "Alternance (1ère année)",
            category: "common",
            tags: ["GLPI", "Ticketing", "Gestion de Parc", "Procédures", "Réunions Daily", "Migration"],
            skillsLinked: ["Gérer le patrimoine informatique", "Répondre aux incidents", "Mettre à disposition un service"],
            image: "assets/project_support.jpg"
        },
        {
            id: 6,
            title: "Projet Tablettes pour les Collèges de l'Hérault",
            description: "Rédaction de documentation technique, préparation et déploiement de tablettes numériques pour les établissements scolaires.",
            longDescription: "Dans le cadre de mon alternance au Département de l'Hérault, j'ai participé activement au projet de dotation numérique des collèges. J'ai eu en charge la rédaction de la documentation technique, la préparation des équipements (tablettes) en amont, ainsi que la coordination pour leur mise en place au sein des établissements scolaires. Ce projet m'a permis d'appréhender le travail en mode projet à grande échelle.",
            context: "Alternance (1ère année)",
            category: "common",
            tags: ["Mode Projet", "Déploiement", "Documentation Technique", "Tablettes", "Éducation"],
            skillsLinked: ["Travailler en mode projet", "Mettre à disposition un service"],
            image: "assets/project_tablettes.jpg"
        },
        {
            id: 7,
            title: "Planification et déploiement d'une Supervision Zabbix",
            description: "Projet de classe axé sur la gestion de projet : analyse des objectifs, planification via diagramme de Gantt et mise en place d'indicateurs de suivi.",
            longDescription: "Dans le cadre de ma formation, j'ai mené un projet complet d'intégration d'une solution de supervision réseau (Zabbix). L'objectif principal de ce projet était de mettre en pratique la méthodologie de gestion de projet. J'ai analysé les objectifs et modalités d'organisation, planifié les activités à l'aide d'un diagramme de Gantt, et évalué les indicateurs de suivi (écarts entre prévisions et réalisations). Techniquement, cela s'est concrétisé par le déploiement du serveur Zabbix et la configuration de tableaux de bord.",
            context: "Activité de Formation (Mode Projet)",
            category: "sisr",
            tags: ["Zabbix", "Supervision", "Mode Projet", "Gantt", "Indicateurs de suivi"],
            skillsLinked: ["Travailler en mode projet", "Mettre à disposition un service"],
            image: "assets/project_zabbix.jpg"
        }
    ],
    
    // Veille Technologique RÉELLE d'Ilyass Daoudi tirée de son fichier de veille
    veille: {
        subject: "La fuite de données massives chez Bouygues Telecom (Mai 2026)",
        definition: "En mai 2026, l'opérateur Bouygues Telecom a été victime d'une cyberattaque majeure entraînant la fuite de plus de 6,3 millions de données personnelles de clients. Cette faille de sécurité met en lumière l'importance capitale de la protection des outils métiers d'administration (comme l'application interne TECH360) et la vulnérabilité liée aux accès accordés aux sous-traitants tiers.",
        whyChosen: "J'ai choisi d'approfondir ce sujet dans le cadre de ma veille car cet incident récent illustre parfaitement que la cybersécurité ne se résume pas à sécuriser le cœur de réseau. La gestion des accès tiers (sous-traitants) et la sécurisation des outils métiers sont des enjeux critiques. De plus, analyser la réponse à un incident d'une telle ampleur est riche en enseignements réglementaires et techniques.",
        axes: [
            {
                title: "1. Gestion des risques liés aux tiers et outils métiers",
                description: "L'incident prouve qu'un attaquant peut exploiter une vulnérabilité non pas dans les routeurs centraux, mais dans un outil métier d'assistance (TECH360) ou par un accès accordé à un sous-traitant. Cela souligne l'importance d'isoler strictement ces applications et d'appliquer le principe du moindre privilège."
            },
            {
                title: "2. Réponse aux incidents et conformité réglementaire",
                description: "Analyse de la gestion de crise post-attaque de Bouygues Telecom : notification officielle à la CNIL dans les 72 heures légales, dépôt de plainte auprès des autorités, et information transparente envoyée aux 6,3 millions de clients impactés dans les délais impartis."
            },
            {
                title: "3. Vigilance d'ingénierie sociale (Phishing ciblé)",
                description: "La divulgation de données techniques et d'abonnements permet à des cybercriminels de concevoir des campagnes d'hameçonnage (phishing) extrêmement ciblées et crédibles, usurpant l'identité de l'opérateur pour cibler les abonnés."
            }
        ],
        tools: [
            { name: "Feedly", usage: "Agrégation et centralisation de flux RSS provenant de blogs spécialisés et de sites d'actualité de référence (ANSSI, Le Monde Informatique, etc.)." },
            { name: "Google Alerts", usage: "Mise en place d'alertes automatiques par e-mail avec les mots-clés : 'fuite données Bouygues Telecom', 'TECH360 vulnérabilité', 'cyberattaque opérateur'." },
            { name: "Newsletters Cybersécurité", usage: "Abonnement aux bulletins hebdomadaires de sécurité pour suivre l'évolution des menaces et des correctifs." }
        ],
        articles: [
            {
                title: "Bouygues Telecom victime d'une nouvelle fuite de données",
                source: "Le Figaro / Le Monde / Journal du Geek",
                summary: "Enquête journalistique et technique sur la faille de sécurité ayant entraîné l'accès non autorisé à plus de 6 millions de comptes clients, expliquant le vecteur d'attaque via l'outil TECH360."
            },
            {
                title: "Directives et recommandations de la CNIL en cas d'attaque par fuite",
                source: "CNIL (Commission Nationale de l'Informatique et des Libertés)",
                summary: "Guide juridique et administratif décrivant les obligations strictes imposées aux opérateurs télécoms pour protéger et notifier en cas de compromission."
            },
            {
                title: "Analyse de la menace : Les risques du phishing d'ingénierie sociale",
                source: "ANSSI (Agence Nationale de la Sécurité des Systèmes d'Information)",
                summary: "Rapport d'analyse montrant comment les attaquants exploitent les métadonnées volées pour mener des campagnes de phishing hautement personnalisées."
            }
        ]
    }
};

// Exportation de la variable pour pouvoir l'utiliser dans app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = portfolioData;
}
