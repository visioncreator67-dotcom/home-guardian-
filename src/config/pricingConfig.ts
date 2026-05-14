export interface PricingConfig {
  country: string;
  currency: string;
  symbol: string;
  plans: {
    proMonthly: number;
    proYearly: number;
    premierMonthly: number;
    premierYearly: number;
  };
  stripePriceIds: {
    proMonthly: string;
    proYearly: string;
    premierMonthly: string;
    premierYearly: string;
  };
}

export interface PricingData {
  country: string;
  currency: string;
  symbol: string;
  plans: {
    proMonthly: number;
    proYearly: number;
    premierMonthly: number;
    premierYearly: number;
  };
  stripePriceIds: {
    proMonthly: string;
    proYearly: string;
    premierMonthly: string;
    premierYearly: string;
  };
}

export const pricingData: PricingData[] = [
  {
    country: "USA",
    currency: "USD",
    symbol: "$",
    plans: {
      proMonthly: 4.99,
      proYearly: 49.99,
      premierMonthly: 9.99,
      premierYearly: 99.99
    },
    stripePriceIds: {
      proMonthly: "",
      proYearly: "",
      premierMonthly: "",
      premierYearly: ""
    }
  },
  {
    country: "UK",
    currency: "GBP",
    symbol: "£",
    plans: {
      proMonthly: 3.99,
      proYearly: 39.99,
      premierMonthly: 7.99,
      premierYearly: 79.99
    },
    stripePriceIds: {
      proMonthly: "",
      proYearly: "",
      premierMonthly: "",
      premierYearly: ""
    }
  },
  {
    country: "South Africa",
    currency: "ZAR",
    symbol: "R",
    plans: {
      proMonthly: 59.99,
      proYearly: 599.99,
      premierMonthly: 99.99,
      premierYearly: 999.99
    },
    stripePriceIds: {
      proMonthly: "",
      proYearly: "",
      premierMonthly: "",
      premierYearly: ""
    }
  },
  {
    country: "Canada",
    currency: "CAD",
    symbol: "$",
    plans: {
      proMonthly: 4.99,
      proYearly: 49.99,
      premierMonthly: 9.99,
      premierYearly: 99.99
    },
    stripePriceIds": {
      proMonthly: "",
      proYearly: "",
      premierMonthly: "",
      premierYearly: ""
    }
  },
  {
    country: "Australia",
    currency: "AUD",
    symbol: "$",
    plans: {
      proMonthly: 5.99,
      proYearly: 59.99,
      premierMonthly: 10.99,
      premierYearly: 109.99
    },
    stripePriceIds: {
      proMonthly: "",
      proYearly: "",
      premierMonthly: "",
      premierYearly: ""
    }
  },
  {
    country: "Germany",
    currency: "EUR",
    symbol: "€",
    plans: {
      proMonthly: 4.99,
      proYearly: 49.99,
      premierMonthly: 8.99,
      premierYearly: 89.99
    },
    stripePriceIds: {
      proMonthly: "",
      proYearly: "",
      premierMonthly: "",
      premierYearly: ""
    }
  },
  {
    country: "Germany",
    currency: "EUR",
    symbol: "€",
    plans: {
      proMonthly: 4.99,
      proYearly: 49.99,
      premierMonthly: 8.99,
      premierYearly: 89.99
    },
    stripePriceIds: {
      proMonthly: "",
      proYearly: "",
      premierMonthly: "",
      premierYearly: ""
    }
  }
];