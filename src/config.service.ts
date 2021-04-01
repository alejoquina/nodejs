import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService{
    //propiedad  tipo var y nombre var 
    private readonly envConfig: {
       [key: string]: string; 
    } 

    //creamos constructor 
    constructor(){
       const isDevelomentEnv =  process.env.NODE_ENV !== "production";
       if(isDevelomentEnv){
            const envFilePatch = __dirname + '../../.env';
            const existPatch = fs.existsSync(envFilePatch);
            if(!existPatch){
                console.log(".env file no existe...");
                process.exit(0);
            }

            this.envConfig = parse(fs.readFileSync(envFilePatch));
       }else{
           this.envConfig = {
               PORT : process.env.PORT,
           }
       }
    }
    get(key:string):string{
        return this.envConfig[key];        
    }



}