const Mutations = {
  createDog(parent, args, ctx, info) {
    global.dogs = global.dogs || [];
    const newDog = { name: args.name };
    global.dogs.push(newDog);
    return newDog;
    //create a dog
  }
};

module.exports = Mutations;
