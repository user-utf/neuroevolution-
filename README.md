neuroevolution but simple


CREATION:
  to create new neural networks use Henrievolution({name of an activation function, how many you want, the architecture in an array form ([3,4,5])})

  example:
    var x = new Henrievolution({AF:'sigmoid',Pop:10,Layers:[3,4,5]})
    this will create 10 neural networks all using sigmoid with an architecture of 3-4-5 (note: the conenctions are currently set to connecting with all neurons in the previous     layer)

  Suported activation functions:
    sigmoid
    BSF
    Relu
    LRelu
    Tanh
RUNNING:
  to run a given NN (nerual net) use the Henrievolution.Run(index of given NN, inputs in array form)

  example:
    x.Run(0,[0.2,0.4,0.1])

EVOLUTION:
  use the function x.Mutate(mutation probability (a number from 1-100), the top percent you want to mutate)

  example:
    x.Mutate(40,2)
