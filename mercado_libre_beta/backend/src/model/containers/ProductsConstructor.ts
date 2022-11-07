import fs from 'fs';

class ProductsConstructor{
    name: any;
    constructor(name: any){
        this.name = name;
    }
    async fileInJSON() {
        try{
            const data = await fs.promises.readFile(this.name, "utf-8");
            if(data){
                return JSON.parse(data);
            }else{
                return []
            }
        }
        catch (error){
            console.log(error);
            return []
        }
    }
    async fileSaving(item:any) {
        let dataJSON = JSON.stringify(item);
        await fs.promises.writeFile(this.name, dataJSON);
    }
    async save (item:any){
        try{
            let data = await this.getAll()
            if(data.length){                
                let lastIndex = data.length - 1
                let lastId = data[lastIndex].id
                item.id = lastId + 1
                let id = item.id
                data.push(item)
                this.fileSaving(data)
                return id
            }else{
                let newProduct = item;
                this.fileSaving([newProduct])
            }
        }
        catch(error){
            console.log(error);
        }
    }
    async getAll(){
        try{
            let data = await this.fileInJSON()
            if (data.length){
                return data
            }else{
                return data = []
            }
        }
        catch(error){
            console.log(error);
            return []
        }
    }
    async getById(id:number){
        try{
            let data = await this.fileInJSON()
            let containerArray
            data.map((el:any) => {el.id === id &&(containerArray = el)})
            return containerArray
        }
        catch(error){
            console.log(error);
        }
    }
    async deleteById(id:number){
        try{
            let data = await this.fileInJSON()
            const productIndex = data.findIndex((product:any) => product.id === id);
            data.splice(productIndex, 1);
            this.fileSaving(data);
        }
        catch(error){
            console.log(error);
        }
    }
}

export default ProductsConstructor