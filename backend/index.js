const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3000;

var cors = require('cors');
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

async function main() {
   
  

    
    
}

main()
    .then(async () => {
       
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/showUserData',async(req,res)=>{
  
    const users = await prisma.user.findMany()
    res.send(" all the  users returned succesfully")
     console.log(users)
})

app.post('/user',async(req,res)=>{

    const{name,email} = req.body
  const UserData=  await prisma.user.create({
        data: {
          name: name,
          email: email
         
        },
      })
res.send('user created succesfully')
    

    
})

app.get('/UniqueUserById/:id',async(req,res)=>{

    const id = parseInt(req.params.id)
    const userId = await prisma.user.findUnique({

        where:{

            id:id
        }
    })
    res.send('user unique returned succesfully')
    console.log(userId)

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
