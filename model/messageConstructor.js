const fs = require('fs')

class MessageConstructor{
    constructor(name){
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
    async fileSaving(item) {
        let dataJSON = JSON.stringify(item);
        await fs.promises.writeFile(this.name, dataJSON);
    }
    async save (item){
        try{
        let data = await this.fileInJSON()
        console.log(data);
        let newId
        if (data.length == 0) {
            newId = 1
        } else {
            newId = data[data.length - 1].id + 1
        }
        const newData = { ...item, id: newId }
        data.push(newData)
            await this.fileSaving(data)
            return newId
        }
        catch(error){
            console.log(error);
        }
    }
    async getAll() {
        try {
            let data = await this.fileInJSON();
            return data
        } catch (error) {
            return []
        }
    }
}

module.exports = MessageConstructor