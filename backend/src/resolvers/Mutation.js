const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
  async createItem(parent, args, ctx, info) {
    //todo check if logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: { ...args }
      },
      info
    );

    return item;
  },
  async updateItem(parent, args, ctx, info) {
    // copy updates
    const updates = { ...args };
    // remove id from updates
    delete updates.id;

    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: { id: args.id }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };

    // find item
    const item = await ctx.db.query.item({ where }, `{ id title }`);
    // check if own item or have permissions to delete
    // delete

    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    // lowercase email
    args.email = args.email.toLowerCase();
    // hash password
    const password = await bcrypt.hash(args.password, 10);

    // create user in db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    //create jwt
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //set jtw as cookie on response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 60 // 2 month
    });
    //return user to browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. Check if user exists
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if pass is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password");
    }
    // 3. Generate jwt
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    // 4. Set cookie w/ token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 60
    });

    // 5. Return user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Come Back Soon!" };
  }
};

module.exports = Mutations;
