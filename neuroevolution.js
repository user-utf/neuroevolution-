var Henrievolution = function (options) {
    //potentialy inform weather we have it
    world: create(options.AF,options.population, options.layers)

    self.setScore = (e,score) =>{
        world[e].value = score
    }
    self.run = (player,inputs) =>{
        return runNN(inputs,player)
    }

    self.mutate = (Perce,topx) =>{
        world = mutation(Perce,topx)
    }
    return self


}
// var x = new Henrievolution({AF:'sigmoid',Pop:10,Layers:[3,4,5]})


mutation = (MutationProbability,chosen) =>{
    var catigories = splitInputs(world,chosen);
    var topInputs = catigories[0];
    // console.log(topInputs == sortInputsByVal(topInputs))

    for (var i = 5; i < topInputs.length;i++){
        for (var b = 0; b < topInputs[i].NN.length;b++){
            for (var c = 0; c < topInputs[i].NN[b].biase.length;c++){
                var rand = Math.floor(Math.random() * 100);
                if (rand <= MutationProbability){
                    topInputs[i].NN[b].biase[c] = Math.random() * 2 -1
                }
            }
            for (var c = 0; c < topInputs[i].NN[b].weights.length;c++){
                var rand = Math.floor(Math.random() * 100);
                if (rand <= MutationProbability){
                    //mutate
                    for (var d = 0; d < topInputs[i].NN[b].weights.length;d++){
                        var rand = Math.floor(Math.random() * 100);
                        if (rand <= MutationProbability){
                            //mutate
                            for (var h = 0; h < topInputs[i].NN[b].weights[d].length;h++){
                                var rand = Math.floor(Math.random() * 100);
                                if (rand <= MutationProbability){
                                    topInputs[i].NN[b].weights[d][h] += Math.random() * 2 -1
                                }
                            }
                        }
                    }
                    
                }
        }
        }
    }
    topInputs = topInputs.concat(catigories[1])
    return sortInputsByVal(topInputs)
}
 
  unmatrixfy = (array) =>{
    var answer = [];
    for (var i = 0; i < array.length; i++){
        for (var b = 0; b < array[i].length; b++){
            answer.push(array[i][b])
        }
    }
    return answer;
}

create = (activation,activeCount,layers) =>{
    world = []
    for (var n = 0; n < activeCount; n++){
    //creating the NNs
    world.push({NN:[],value:0})
        for (var l = 0; l < layers.length; l++){
            var set1 = [];
                for (var node = 0; node < layers[l];node++){
                    set1.push(0)
                }
            var weightset = [];
            if (l > 0){
            for (var node = 0; node < layers[l];node++){
                weightset.push([])
                for (var node0 = 0; node0 < layers[l-1];node0++){
                    weightset[node].push(0)
                }
            }
        }
            activ = activation
            world[n].NN.push({Layers:set1,weights:weightset,biase:set1,activation:activ})
            // console.log(world);
        }
    }
    return world
}
run1 = (input,n) =>{
    world[n].NN[0].Layers = input;        
}
activate = (i,i2,i3) =>{
    var add = 0
    for (var b = 0; b < world[i].NN[i2].weights[i3].length;b++){
        add += world[i].NN[i2-1].Layers[b] * world[i].NN[i2].weights[i3][b]
    }
    // console.log(world[i].NN[i2].Layers[i3])
    add += world[i].NN[i2].biase[i3]
    let afterActive;
    switch(world[i].NN[i2].activation) {
        case  "sigmoid":
            afterActive = sigmoid(add);
            break;
        case  "BSF":
            afterActive = BSF(add);
            break;
        case  "Relu":
            afterActive = Relu(add);
            break;
        case  "LRelu":
            afterActive = LRelu(add);
            break;
        case  "Tanh":
            afterActive = Tanh(add);
    }
    world[i].NN[i2].Layers[i3] = afterActive
    // console.log(world[i].NN[i2].Layers[i3],add)
}
fill = (n) =>{
    for (var n2 = 1; n2 < world[n].NN.length; n2++){
        // console.log(world[n].NN[n2])
        for (var n3 = 0; n3 < world[n].NN[n2].Layers.length; n3++){
            // console.log(n3)
            activate(n,n2,n3);
            if (n2 == world[n].NN.length-1 && n3 == world[n].NN[n2].Layers.length-1){
                // console.log(world[n].NN[n2].Layers,"FGJGF")
                return world[n].NN[n2].Layers
                }
            }
        }
}
function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
}

function BSF (x){
    if (x<0){
        return 0
    }else{
        return 1
    }
}

function Relu(x){
    if (x<0){
        return 0
    }else{
        return x
    }
}
function LRelu(x){
    if (x<0){
        return 0.01*x
    }else{
        return x
    }
}
function Tanh(x){
    return (2*sigmoid(2*x)-1)
}

// function ELU(){

// }
runNN = (inputs,n) =>{
    run1(inputs,n)
    return fill(n);
}
function splitInputs(originalList,chosenPer){
    const sortedList = sortInputsByVal(originalList)
    const limit = Math.floor(sortedList.length * chosenPer /100);
    return [sortedList.slice(0,limit),sortedList.slice(limit)];
}
function sortInputsByVal(originalList){
    const list = originalList
    const len = list.length
    for (let i = 0; i < len; i++) {
      let min = i
      for (let j = i + 1; j < len; j++) {
        if (list[min].value > list[j].value) {
          min = j
        }
      }
      if (min !== i) {
        // a new minimum is found. Swap that with the current element
        ;[list[i], list[min]] = [list[min], list[i]]
      }
    }
    let list2 = []
    for (var i = list.length-1; i >= 0;i--){
        list2.push(list[i])
    }
    return list2
}
