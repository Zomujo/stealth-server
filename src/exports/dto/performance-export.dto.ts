import { IMSLocations } from './query.dto';

export const PerformanceExportSchema: Record<string, any> = {
  locations: {
    [IMSLocations.NORTHERN]: {
      facilities: [
        "'SABOBA DHD'",
        "'TOLON DHA'",
        "'NANUMBA NORTH MHD'",
        "'NANUMBA SOUTH DHD'",
        "'KUMBUNGU DHD'",
        "'KARAGA DHA'",
      ],
    },

    [IMSLocations.SAVANNAH]: {
      facilities: [
        "'WEST GONJA MUNICIPAL HEALTH DIRECTORATE'",
        "'JANTONG H/C - North-East Gonja'",
        "'SANKUMPE-CENTRAL GONJA DHD'",
        "'DAASHEI CHPS - North-East Gonja'",
        "'CENTRAL GONJA DHD'",
      ],
    },
  },

  sections: {
    general: {
      title: 'GENERAL DATA FOR ALL HEALTH CENTERS',
      headers: (_: any) => [
        {
          label: 'Health Directorates',
          property: 'healthDirectorates',
          width: 250,
          renderer: null,
        },
        {
          label: 'Number Of Health Centers',
          property: 'numberOfHealthCenters',
          width: 150,
          renderer: null,
        },
        {
          label: 'Health Centres',
          property: 'healthCentres',
          width: 600,
          renderer: null,
        },
        {
          label: 'Total Number Of Users',
          property: 'totalNumberOfUsers',
          width: 150,
          renderer: null,
        },
        {
          label: 'Number Of Central Admins',
          property: 'numberOfCentralAdmins',
          width: 150,
          renderer: null,
        },
        {
          label: 'Number Of Department Admins',
          property: 'numberOfDepartmentAdmins',
          width: 200,
          renderer: null,
        },
        {
          label: 'Number Of Pharmacists',
          property: 'numberOfPharmacists',
          width: 130,
          renderer: null,
        },
      ],
    },

    saleAndStockingActivity: {
      title: 'HEALTH CENTER SALES AND STOCKING AUDITS',
      headers: (_: any) => [
        {
          label: 'Health Directorates',
          property: 'healthDirectorates',
          width: 350,
          renderer: null,
        },
        {
          label: 'Health Centers',
          property: 'healthCenters',
          width: 350,
          renderer: null,
        },
        {
          label: 'Sales Created',
          property: 'salesCreated',
          width: 170,
          renderer: null,
        },
        {
          label: 'Time Of Recent Sale',
          property: 'timeOfRecentSale',
          width: 300,
          renderer: null,
        },
        {
          label: 'Batches Added',
          property: 'batchesAdded',
          width: 170,
          renderer: null,
        },
        {
          label: 'Time Of Recently Added Batch',
          property: 'timeOfRecentlyAddedBatch',
          width: 290,
          renderer: null,
        },
        // {
        //   label: 'Items Added',
        //   property: 'itemsAdded',
        //   width: 261,
        //   renderer: null,
        // },
        // {
        //   label: 'Time Of Recently Added Item',
        //   property: 'timeOfRecentlyAddedItem',
        //   width: 262,
        //   renderer: null,
        // },
      ],
    },

    systemUsage: {
      title: 'SYSTEM USAGE BY HEALTH CENTERS',
      headers: (days: number) => [
        {
          label: 'Health Directorates',
          property: 'healthDirectorates',
          width: 550,
          renderer: null,
        },
        {
          label: 'Health Centers',
          property: 'healthCenters',
          width: 600,
          renderer: null,
        },
        {
          label: `Usage Days In The Last ${days} Days`,
          property: 'usageDaysInTheMonth',
          width: 300,
          renderer: null,
        },
        {
          label: 'Percentage Usage',
          property: 'percentageUsage',
          width: 200,
          renderer: null,
        },
      ],
    },

    totalQuantity: {
      title: 'INVENTORY LEVELS OF HEALTH CENTERS',
      headers: (_: any) => [
        {
          label: 'Health Directorates',
          property: 'healthDirectorates',
          width: 700,
          renderer: null,
        },
        {
          label: 'Health Centers',
          property: 'healthCenters',
          width: 700,
          renderer: null,
        },
        {
          label: 'Total Quantity',
          property: 'totalQuantity',
          width: 200,
          renderer: null,
        },
      ],
    },
  },
};
