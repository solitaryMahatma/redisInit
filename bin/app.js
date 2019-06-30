//import { log } from "util";

const  a = (...rest)=>{
    console.log(rest)
    //console.log(rest instanceof Array);
    const ccc = rest.slice(2, rest.length)
    console.log(rest, 7)
    console.log(ccc, 8);
    c(...ccc)
}
const c = (...rest)=>{
    console.log(...rest)
    d(...rest)
}

const d = (a, b, c, d, e, f, g) => {
    console.log(c)
}


const b  = (...rest) =>{
    const jjj = '1111'
    const jj1j = '1111'
    a(jjj, jj1j, ...rest)
}

b(1,2,3,4,5,6,7)