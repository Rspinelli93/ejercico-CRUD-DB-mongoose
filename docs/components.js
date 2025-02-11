module.exports = {
    components:{
        schemas:{
            Task:{
                type:'object',
                properties:{
                    _id:{
                        type:'objectId',
                        description:"Task identification number",
                        example:"67aa0d58889658f3c8a55779"
                    },
                    title:{
                        type:'string',
                        description:"Name of the task",
                        example:"Swipe the floor"
                    },
                    completed:{
                        type:'boolean',
                        description:'Tells if the task is done or not',
                        example:'true'
                    },
                }
            }
        }
    }
}


//se accede a los componentes mediante $ref.