import cheerio from 'cheerio';

export class HtmlFetFile {
    
    $ : cheerio.Root;

    constructor(html : string) {
        // Load file to cheerio
        this.$ = cheerio.load(html);
    }

    getFETTables(): cheerio.Cheerio {
        // Get all the tables
        let tables = this.$('table');

        // Filter and get required
        let filtered = tables.filter((index, element) => {
            const id = this.$(element).attr("id");
            if(id) {
                if(id.indexOf("table_") > -1) {
                    return true;
                }else{
                    return false;
                }
            }
            return false;
        });

        return filtered;
    }

    getHTML(table : cheerio.Element): string {
        return this.$(table).html();
    }

    tableToHTMLArray(table : cheerio.Element) {
        const outObj : ArrayTimeTable = {
            days: [],
            time: {}
        };
        const yAxis = this.$(".yAxis",table);
        const xAxis = this.$(".xAxis",table);

        const xLen = xAxis.length;
        
        xAxis.each((i,elem) => {
            outObj.days.push(this.$(elem).html());
        });

        yAxis.each(((i,elem) => {
            let last = this.$(elem);
            let timeKey : string = this.$(elem).html().trim();
            outObj.time[timeKey] = [];

            for(let i = 0; i < xLen; i++) {
                let eNow = this.$(last).next();
                if(!eNow.get(0) || eNow.get(0).tagName != 'td'){
                    break;
                }
                outObj.time[timeKey].push(
                    {
                        html:eNow.html(),
                        extra: {}
                    }
                );
                last = eNow;
            }
        }));
        return outObj;
    }
}

export interface ArrayTimeTable {
    days : string[],
    time : {
        [key : string] : Array<TimeElem>
    }
}

export interface TimeElem {
    html: string,
    extra: any
}