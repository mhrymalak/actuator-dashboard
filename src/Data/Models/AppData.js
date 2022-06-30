const environments = [
    "dev",
    "perf",
    "prod"
  ];
  
  const regularSpace = ".com";
  const laranja = ".laranja.com";
  const abacaxi = ".abacaxi.com";
  
  const envAppData = {
    apiCommon: {
      title: "API",
      url: "https://api",
    },
    massUpdateCommon: {
      title: "Mass Update",
      url: "https://processor-mass-update-requests",
    },
    chaUploadCommon: {
      title: "Channel Upload",
      url: "https://processor-enrichment-requests-channel-up",
    },
    validationChannel: {
      title: "Channel Validation",
      url: "https://processor-validation-channel",
    },
    enrichmentChannel: {
      title: "Channel Enrichment",
      url: "https://processor-enrichment-requests-channel",
    },
    inboundChannel: {
      title: "Channel Inbound",
      url: "https://hft-inbound-processor-channel",
    },
    outboundChannel: {
      title: "Channel Outbound",
      url: "https://hft-outbound-processor-channel",
    },
    ordersInvoicedChannel: {
      title: "Channel Orders",
      url: "https://processor-orders-invoiced-channel",
    }
  };
  
  for (let z = 0; z < environments.length; z++) {
    for (const item in envAppData) {
      if (environments[z] === "laranja") {
        envAppData[item][environments[z]] = `${envAppData[item]["url"]}${laranja}`;
      }
      else if (environments[z] === "abacaxi") {
        envAppData[item][environments[z]] = `${envAppData[item]["url"]}${abacaxi}`;
      } else {
        envAppData[item][environments[z]] = `${envAppData[item]["url"]}-${environments[z]}${regularSpace}`;
      }
    }
  }
  
  for (const item in envAppData) {
    delete envAppData[item]["url"];
  }
  
  export { envAppData, environments };
  