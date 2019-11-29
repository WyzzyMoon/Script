/**
* ------------------ SCRIPT TRANSLATOR ------------------
* Date: 29-11-2019
* Version: 1.0
* Script is a script designed and created by Wikke Andeweg
* info@wikkeandeweg.nl
* https://www.wikkeandeweg.nl
*
* License: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 (CC BY-NC-SA 3.0)
* https://creativecommons.org/licenses/by-nc-sa/3.0/
* --------------------------------------------------------
*/

let vallidChar =  ['k','K','l','L','m','M','n','N','p','P','q','Q','r','R','⓪','①','②','③','④','⑤','❺','⑥','⑦','❼','⑧','⑨','❾', '⑩', '⑪', '⑫', '⑬', '⑭', 's','S','t','T','v','V','w','W','x','X','y','Y','z','Z','\.', '\!', '\,', '\?', '\`', '\'', '\^', '\(', '\/','\\', '\)', '\"','b','B','c','C','d','D','f','F','g','G','h','H','j','J','a','e','i','o','u','A','E','I','O','U','á','Á','à','À','â','Â','ä','Ä','é','É','è','È','ê','Ê','ë','Ë','í','Í','ì','Ì','î','Î','ï','Ï','ó','Ó','ò','Ò','ô','Ô','ö','Ö','ø','Ø','ú','Ú','ù','Ù','û','Û','ü','Ü','~'];

let capitals = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','Á','À','Â','Ä','É','È','Ê','Ë','Í','Ì','Î','Ï','Ó','Ò','Ô','Ö','Ø','Ú','Ù','Û','Ü'];
let vowels = ['a','e','i','o','u','A','E','I','O','U'];

let numbers = ['⓪','①','②','③','④','⑤','❺','⑥','⑦','❼','⑧','⑨','❾', '⑩', '⑪', '⑫', '⑬', '⑭'];
let punctuation = ['\.', '\!', '\,', '\?', '\`', '\'', '\^', '\(', '\/','\\', '\)', '\"'];

let accvowels = ['á','Á','à','À','â','Â','ä','Ä','é','É','è','È','ê','Ê','ë','Ë','í','Í','ì','Ì','î','Î','ï','Ï','ó','Ó','ò','Ò','ô','Ô','ö','Ö','ø','Ø','ú','Ú','ù','Ù','û','Û','ü','Ü'];
let  acute = ['á','Á','é','É','í','Í','ó','Ó','ú','Ú'];
let  grave = ['à','À','è','È','ì','Ì','ò','Ò','ù','Ù'];
let  circ = ['â','Â','ê','Ê','î','Î','ô','Ô','û','Û'];
let  uml = ['ä','Ä','ë','Ë','ï','Ï','ö','Ö','ü','Ü'];
let  slash = ['ø','Ø'];

let agroup = ['a','A','á','Á','à','À','â','Â','ä','Ä']
let egroup = ['e','E','é','É','è','È','ê','Ê','ë','Ë']
let igroup = ['i','I','í','Í','ì','Ì','î','Î','ï','Ï']
let ogroup = ['o','O','ó','Ó','ò','Ò','ô','Ô','ö','Ö','ø','Ø']
let ugroup = ['u','U','ú','Ú','ù','Ù','û','Û','ü','Ü']

let KBS = ['k','b','s','K','B','S'];
let LCT = ['l','c','t','L','C','T'];
let MDV = ['m','d','v','M','D','V'];
let NFW = ['n','f','w','N','F','W'];
let PGX = ['p','g','x','P','G','X'];
let QHY = ['q','h','y','Q','H','Y'];
let RJZ = ['r','j','z','R','J','Z'];
let ZERO = ['⓪', '\.'];
let ONE = ['①', '\!'];
let TWO = ['②', '\,'];
let THREE = ['③', '\?'];
let FOUR = ['④', '\`'];
let FIVE = ['⑤', '\''];
let FIVEalt = ['❺', '\^'];
let SIX = ['⑥', '\('];
let SEVEN = ['⑦', '\/'];
let SEVENalt = ['❼', '\\']
let EIGHT = ['⑧', '\)'];
let NINE = ['⑨'];
let NINEalt = ['❾', '\"']
let TEN = ['⑩'];
let ELEVEN = ['⑪'];
let TWELVE = ['⑫' ];
let THITHEEN = ['⑬'];
let FOURTEEN = ['⑭'];

let  topentry = ['k','K','l','L','m','M','n','N','p','P','q','Q','r','R','⓪','①','②','③','④','⑤','❺','⑥','⑦','❼','⑧','⑨','❾', '⑩', '⑪', '⑫', '⑬', '⑭'];
let  botentry = ['s','S','t','T','v','V','w','W','x','X','y','Y','z','Z','\.', '\!', '\,', '\?', '\`', '\'', '\^', '\(', '\/','\\', '\)', '\"'];
let  leftentry = ['b','B','c','C','d','D','f','F','g','G','h','H','j','J','a','e','i','o','u','A','E','I','O','U','á','Á','à','À','â','Â','ä','Ä','é','É','è','È','ê','Ê','ë','Ë','í','Í','ì','Ì','î','Î','ï','Ï','ó','Ó','ò','Ò','ô','Ô','ö','Ö','ø','Ø','ú','Ú','ù','Ù','û','Û','ü','Ü'];