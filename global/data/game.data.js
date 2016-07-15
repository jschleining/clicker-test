angular.module('clickerApp')

.constant('GameData', {
  SETTINGS: {
    baseClickValue: 1
  },
  RESOURCES: [
    {
      id: 'rid-0001',
      name: 'Resource 1',
      description: 'lorem ipsum dolor sit amet',
      baseCost: 10
    },
    {
      id: 'rid-0002',
      name: 'Resource 2',
      description: 'lorem ipsum dolor sit amet',
      baseCost: 20
    },
    {
      id: 'rid-0003',
      name: 'Resource 3',
      description: 'lorem ipsum dolor sit amet',
      baseCost: 30
    }
  ],
  FACTORIES: [
    {
      id: 'fid-0001',
      name: 'Factory 1',
      description: 'lorem ipsum dolor sit amet',
      baseCost: 10,
      baseProduction: 1,
      state: 'UNLOCKED',
      shadowIcon: 'lens',
      fullIcon: 'spa',
      requirements: null
    },
    {
      id: 'fid-0002',
      name: 'Factory 2',
      description: 'lorem ipsum dolor sit amet',
      baseCost: 50,
      baseProduction: 5,
      state: 'SILHOUETTE',
      shadowIcon: 'lens',
      fullIcon: 'spa',
      requirements: {
        show: [
          {
            type: 'BUY_FACTORY_',
            target: 'fid-0001',
            count: 8
          }
        ],
        unlock: [
          {
            type: 'BUY_FACTORY_',
            target: 'fid-0001',
            count: 10
          }
        ]
      }
    },
    {
      id: 'fid-0003',
      name: 'Factory 3',
      description: 'lorem ipsum dolor sit amet',
      baseCost: 100,
      baseProduction: 10,
      state: 'HIDDEN',
      shadowIcon: 'lens',
      fullIcon: 'spa',
      requirements: {
        show: [
          {
            type: 'BUY_FACTORY_',
            target: 'fid-0002',
            count: 8
          }
        ],
        unlock: [
          {
            type: 'BUY_FACTORY_',
            target: 'fid-0001',
            count: 10,
            listenerName: 'factoryOneListener'
          },
          { // test
            type: 'BUY_FACTORY_',
            target: 'fid-0002',
            count: 10,
            listenerName: 'factoryTwoListener'
          }
        ]
      }
    },
  ]
})
