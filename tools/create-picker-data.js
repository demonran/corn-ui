
const fs = require("fs");

function readFileText(filepath)
{
    return new Promise((resolve,reject)=>{
        fs.readFile(filepath, 'utf8', (error, data)=>{
            if(!error) resolve(data);
            reject(error);
        });
    });
}



async function create() {

    let txt = await readFileText("./addressDatas");
    
    let o = JSON.parse(txt);
    
    let data = [];
    let n = o.length;
    for(let i=1; i< n; i++)
    {
        let item = o[i];
        data.push( {name:item.label,value:item.label, parent:0} );
        
        let childSize = item.children.length;
        for(let k=0; k<childSize; k++)
        {
            let subItem = item.children[k];
            data.push( {name:subItem.label,value:subItem.label, parent:item.label} );
        }
    }
    let datafile = `export default ${JSON.stringify(data)}`;

    fs.writeFileSync("./areadata.js", datafile);
}

create();