class APIfeatures{
    constructor(query,queryString){
        this.query = query , 
        this.queryString = queryString 


    }
    filters(){
        const queryObj =  {...this.queryString}
        let queryst = JSON.stringify(queryObj)
        queryst = queryst.replace(/\b(gte|gt|lte|lt)\b/g, match=> `$${match}`)
        console.log(JSON.parse(queryst))
        const excludeFields = ["page" ,"sort",'limit','fields' ]
        excludeFields.forEach(element => {delete queryObj[element]   
        });
        this.query= this.query.find(JSON.parse(queryst))
        return this
    }
    sort(){
        if(this.queryString.sort){
            const sortby = this.queryString.sort.split(',').join(" ")
            this.query = this.query.sort(sortby)
        }else{
            this.query = this.query.sort('-create')
        }
        return this
    }
    fields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(" ")
            this.query = this.query.select(fields)
        }else{
            this.query =this.query.select("-__v")
        }
        return this
    }
    proman(){
        const page =this.queryString.page *1 || 1
        const limit =  this.queryString.limit *1 || 100
        const skip = (page - 1) *limit
        this.query = this.query.skip(skip).limit(limit)
        return this
    }

}
module.exports = APIfeatures