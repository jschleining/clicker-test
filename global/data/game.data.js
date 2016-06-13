angular.module('clickerApp')

.constant('GameData', {
  RESOURCES: [
    {
      id: 'rid-0001',
      name: 'thing 1',
      description: 'an awesome description',
      cost: 10,
      owned: 0
    },
    {
      id: 'rid-0002',
      name: 'thing 2',
      description: 'lorem ipsum dolor sit amet',
      cost: 20,
      owned: 0
    },
    {
      id: 'rid-0003',
      name: 'thing 3',
      description: 'an awesome description',
      cost: 30,
      owned: 0
    }
  ],
  FACTORIES: [
    {
      id: 'fid-0001',
      name: 'factory 1',
      description: 'an awesome description',
      cost: 10,
      owned: 0,
      production: 1
    },
    {
      id: 'fid-0002',
      name: 'factory 2',
      description: 'an awesome description',
      cost: 50,
      owned: 0,
      production: 5
    },
    {
      id: 'fid-0003',
      name: 'factory 3',
      description: 'an awesome description',
      cost: 100,
      owned: 0,
      production: 10
    },
  ]
})