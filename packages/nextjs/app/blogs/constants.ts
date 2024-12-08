export const json = [
  {
    title: "How Rolex Can Go On-Chain: Exploring Blockchain Innovations",
    description:
      "Discover innovative ways for Rolex to leverage blockchain technology for enhancing operations, ensuring product authenticity, and improving customer trust.",
    options: [
      {
        usecase: "Tokenisation of Supply Chain Data",
        description:
          "Use tokenisation to create a transparent and immutable record of supply chain processes. This improves traceability and accountability from manufacturing to distribution.",
        technology_name: "Tokenisation",
        department_it_will_improve: "Supply Chain Management",
        how_to_integrate:
          "Implement blockchain-based supply chain platforms that allow each step in the supply chain to be recorded as a token on the blockchain.",
        companies: ["VeChain", "IBM Food Trust"],
      },
      {
        usecase: "NFTs for Product Authenticity",
        description:
          "Use NFTs to certify the authenticity of products, particularly in high-value goods, ensuring customers receive genuine products.",
        technology_name: "NFTs",
        department_it_will_improve: "Quality Assurance",
        how_to_integrate:
          "Generate NFTs linked to unique product identifiers which can be verified by customers using a blockchain-based app.",
        companies: ["LVMH", "Nike"],
      },
      {
        usecase: "Decentralized Finance (DeFi) for Inventory Financing",
        description:
          "Utilize DeFi platforms to obtain financing for inventory, allowing more flexible and accessible funding options.",
        technology_name: "DeFi",
        department_it_will_improve: "Inventory Management",
        how_to_integrate:
          "Partner with DeFi platforms to secure loans using smart contracts that leverage inventory as collateral.",
        companies: ["MakerDAO", "Compound"],
      },
      {
        usecase: "Blockchain for Secure Customer Data Management",
        description:
          "Enhance the security and privacy of customer data in CRM systems using blockchain's encryption and decentralization features.",
        technology_name: "Security/Traceability",
        department_it_will_improve: "Customer Relationship Management",
        how_to_integrate:
          "Integrate blockchain solutions that allow customer data to be stored securely and accessed only with authorized keys.",
        companies: ["Civic", "uPort"],
      },
    ],
    mermaid:
      "graph TD;\n    A[Start] --> B[Product Design];\n    B --> C{Approval Needed?};\n    C -->|Yes| D[Design Review];\n    C -->|No| E[Prototype Development];\n    D --> E;\n    E --> F[Testing & Quality Assurance];\n    F --> G{Passed QA?};\n    G -->|Yes| H[Manufacturing];\n    G -->|No| I[Rework Prototype];\n    I --> E;\n    H --> J[Inventory Management];\n    J --> K[Sales & Marketing];\n    K --> L[Customer Feedback];\n    L --> M{Feedback Positive?};\n    M -->|Yes| N[End Process];\n    M -->|No| O[Product Improvement];\n    O --> E;\n    \n    subgraph Stakeholders\n        B & D & F & K\n    end\n    \n    subgraph Departments\n        B(Design) --> E\n        F(Quality Assurance) --> G\n        H(Manufacturing) --> J\n        K(Marketing) --> L\n    end\n    \n    subgraph Systems\n        J(Inventory System) --> K\n        L(CRM System) --> M\n    end\n    \n    classDef stakeholders fill:#f9f,stroke:#333,stroke-width:2px;\n    classDef departments fill:#bbf,stroke:#333,stroke-width:2px;\n    classDef systems fill:#bfb,stroke:#333,stroke-width:2px;\n    \n    class B,D,F,K stakeholders;\n    class B,E,F,G,H,J,K,L departments;\n    class J,L systems;\n    \n    style A fill:#ffcccc,stroke:#333,stroke-width:2px;\n    style N fill:#ccffcc,stroke:#333,stroke-width:2px;\n    style O fill:#ffcccc,stroke:#333,stroke-width:2px;",
  },
  {
    title: "How Zomato Can Leverage Blockchain for Innovation",
    description:
      "Explore how Zomato can integrate blockchain technologies like tokenization and DeFi to enhance operations, improve customer loyalty, and provide value to restaurant partners.",
    options: [
      {
        usecase: "Tokenisation of Loyalty Programs",
        description:
          "Implement a blockchain-based loyalty program where customers earn tokens for placing orders, which can be redeemed for discounts or exclusive deals.",
        technology_name: "Tokenisation",
        department_it_will_improve: "Marketing",
        how_to_integrate:
          "Develop smart contracts on a blockchain platform to issue and manage tokens. Integrate this system with the Zomato App for a seamless user experience.",
        companies: ["Starbucks", "Rakuten"],
        blobId: "oA4Y2YxFp7wkeZjsJS79-x9fyQhknJl_izFLsraoZNg",
      },
      {
        usecase: "Decentralized Finance (DeFi) for Restaurant Partners",
        description:
          "Offer DeFi solutions to restaurant partners for faster access to funds and financial products like loans and credit lines.",
        technology_name: "DeFi",
        department_it_will_improve: "Finance Department",
        how_to_integrate:
          "Partner with DeFi platforms to provide financial services directly through the Zomato platform to restaurant partners.",
        companies: ["Compound", "Aave"],
        blobId: "-Zv5PqSig3EN6pz2qv_QV3iqLMAZ2IJ5yi1KopVSBfg",
      },
      {
        usecase: "NFT-based Menu Items",
        description:
          "Create NFTs for special menu items or limited-time offers, enhancing customer engagement and offering unique dining experiences.",
        technology_name: "NFTs",
        department_it_will_improve: "Marketing & Sales Team",
        how_to_integrate:
          "Utilize the Zomato App/Website to display NFT-based items and integrate with the Order Management System for processing.",
        companies: ["Taco Bell"],
        blobId: "UUFk42e4cQ8BDHZFkMqpK_zLqZhkeGlmVqeeUTnUMWI",
      },
      {
        usecase: "DeFi for Payment Processing",
        description:
          "Utilize decentralized finance (DeFi) to handle payment transactions, reducing fees and increasing transaction speed.",
        technology_name: "DeFi",
        department_it_will_improve: "Financial Management",
        how_to_integrate:
          "Replace traditional payment gateways with DeFi solutions to process payments and integrate with revenue collection systems.",
        companies: ["MakerDAO", "Compound"],
        blobId: "vuqchr8PAFfiGQUrIDKYPTSJfwMqhQrVqxvaKd0150M",
      },
    ],
    mermaid:
      "graph TD;\n    A[Zomato Business Process] -->|Engagement| B[Customer Acquisition];\n    A -->|Collaboration| C[Restaurant Partner Management];\n    A -->|Integration| D[Technology and Infrastructure];\n    B -->|Marketing Campaigns| E[Social Media Channels];\n    B -->|Referral Programs| F[Loyalty and Rewards];\n    C -->|Onboarding| G[Contract Management];\n    C -->|Support| H[Partner Support Services];\n    D -->|Platform Development| I[Web & Mobile Application];\n    D -->|Data Management| J[Data Analytics & Insights];\n    E --> K[Facebook & Instagram];\n    E --> L[Twitter & LinkedIn];\n    F --> M[Discount Coupons];\n    F --> N[Cashback Offers];\n    G --> O[Legal Department];\n    G --> P[Finance Department];\n    H --> Q[Technical Support];\n    H --> R[Customer Service];\n    I --> S[User Experience Enhancement];\n    I --> T[Security & Compliance];\n    J --> U[Real-Time Analytics];\n    J --> V[Customer Behavior Insights];\n    subgraph Departments\n        O\n        P\n        Q\n        R\n    end;\n    subgraph Systems\n        K\n        L\n        M\n        N\n        S\n        T\n        U\n        V\n    end;",
  },
  {
    title: "How Uber Can Leverage Blockchain for Enhanced Operations",
    description:
      "Uber can explore blockchain technology to streamline operations, enhance customer loyalty, and improve payment processing. By integrating various blockchain use cases, Uber can provide innovative solutions for both customers and drivers.",
    options: [
      {
        usecase: "Tokenization of Rides",
        description:
          "Create a token-based system where rides can be tokenized. Customers purchase ride tokens that can be used for booking rides.",
        technology_name: "Tokenization",
        department_it_will_improve: "Finance, Operations",
        how_to_integrate:
          "Integrate a blockchain-based token system with the App Platform (K) to allow customers to buy, trade, and redeem ride tokens.",
        companies: ["Chronicled", "Securitize"],
      },
      {
        usecase: "NFT-based Loyalty Programs",
        description:
          "Use NFTs to represent customer loyalty points, which can be collected and redeemed for rewards or special promotions.",
        technology_name: "NFTs",
        department_it_will_improve: "Marketing, Customer Service",
        how_to_integrate:
          "Integrate NFTs with the CRM System (N) to track customer interactions and reward them with NFTs that can be redeemed within the App Platform (K).",
        companies: ["Starbucks Odyssey", "Nike (RTFKT)"],
      },
      {
        usecase: "Decentralized Finance (DeFi) for Payments",
        description:
          "Implement DeFi solutions to process payments, offering lower transaction fees and faster processing times.",
        technology_name: "DeFi",
        department_it_will_improve: "Finance",
        how_to_integrate:
          "Integrate DeFi payment solutions with the Payment Gateway (L) to handle transactions securely and efficiently.",
        companies: ["Aave", "Compound"],
      },
      {
        usecase: "Blockchain-based Compliance Tracking",
        description:
          "Utilize blockchain for secure and transparent compliance tracking, ensuring all transactions and operations comply with regulatory standards.",
        technology_name: "Security/Traceability",
        department_it_will_improve: "Legal, Operations",
        how_to_integrate:
          "Use a blockchain ledger in conjunction with Data Analytics (M) to record compliance-related data that can be verified by Regulatory Bodies (D).",
        companies: ["IBM Food Trust", "Everledger"],
      },
    ],
    mermaid:
      "graph TB;\n\n    subgraph Stakeholders\n        A[Customers]\n        B[Drivers]\n        C[Partners]\n        D[Regulatory Bodies]\n    end\n\n    subgraph Departments\n        E[Operations]\n        F[Customer Service]\n        G[Finance]\n        H[Legal]\n        I[Marketing]\n        J[Technology]\n    end\n\n    subgraph Systems\n        K[App Platform]\n        L[Payment Gateway]\n        M[Data Analytics]\n        N[CRM System]\n    end\n\n    A -->|Book Ride| K\n    B -->|Accept Ride| K\n    A -->|Feedback| F\n    B -->|Payment Processing| L\n    C -->|Provide Services| E\n    D -->|Compliance| H\n    E -->|Manage Operations| K\n    F -->|Handle Queries| N\n    G -->|Financial Transactions| L\n    G -->|Financial Reporting| M\n    H -->|Legal Compliance| M\n    I -->|Market Campaigns| M\n    I -->|Customer Promotions| K\n    J -->|Develop Features| K\n\n    linkStyle default stroke:#2ecc71,stroke-width:2px;\n    style A fill:#ffcc00,stroke:#333,stroke-width:1px;\n    style B fill:#ff6600,stroke:#333,stroke-width:1px;\n    style C fill:#ffcc00,stroke:#333,stroke-width:1px;\n    style D fill:#ff6600,stroke:#333,stroke-width:1px;\n    style E fill:#3366cc,stroke:#333,stroke-width:1px;\n    style F fill:#3366cc,stroke:#333,stroke-width:1px;\n    style G fill:#3366cc,stroke:#333,stroke-width:1px;\n    style H fill:#3366cc,stroke:#333,stroke-width:1px;\n    style I fill:#3366cc,stroke:#333,stroke-width:1px;\n    style J fill:#3366cc,stroke:#333,stroke-width:1px;\n    style K fill:#66ccff,stroke:#333,stroke-width:1px;\n    style L fill:#66ccff,stroke:#333,stroke-width:1px;\n    style M fill:#66ccff,stroke:#333,stroke-width:1px;\n    style N fill:#66ccff,stroke:#333,stroke-width:1px;",
  },
];
