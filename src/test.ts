import { HtmlFetFile, ArrayTimeTable, TimeElem } from './parseFET';
import fs from 'fs';
import util from 'util';
import cheerio from 'cheerio';

function run() {
    // Read the Test Asset 
    const fetString = fs.readFileSync("testAssets/WD_TimetableV3_SemesterII-2021_FET_5.47.0.html").toString();

    const fet = new HtmlFetFile(fetString)
    const tables = fet.getFETTables();
    const table = fet.getHTML(tables[0]);

    let tableObjs : Array<ArrayTimeTable> = []; 
    tables.each((i,e) => {
        let obj = fet.tableToHTMLArray(e);
        tableObjs.push(obj);
        //console.log(util.inspect(obj, false, null, true /* enable colors */))
    })
    // Reconstruct the table
    const $ = cheerio.load("<div id='root'></div>");
    const root_ = $('#root');
    const table_ = $('<table></table>').appendTo(root_);
     for(const t of tableObjs) {
        const table_ = $('<table></table>').appendTo(root_);
        for(const timekey in t.time){
            const tr = $('<tr></tr>');
            tr.append($(`<th>${timekey}</th>`));
            for(const td of t.time[timekey]){
                tr.append($(`<td>${td.html}</td>`));
            }
            table_.append(tr);
        }
        
     }
    console.log($.html());
     fs.writeFileSync("./pp.html",$.html());
    //console.log(table);
}

run();