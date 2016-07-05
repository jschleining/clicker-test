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
      baseProduction: 1
    },
    {
      id: 'fid-0002',
      name: 'Factory 2',
      description: 'lorem ipsum dolor sit amet',
      baseCost: 50,
      baseProduction: 5
    },
    {
      id: 'fid-0003',
      name: 'Factory 3',
      description: 'lorem ipsum dolor sit amet',
      baseCost: 100,
      baseProduction: 10
    },
  ]
})