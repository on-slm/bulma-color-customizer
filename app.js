// where to continue:
// files: users.js & userController.js
// link: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#Testing_the_routes

// how to start mongod: sudo service mongod start
// how to run the app:  nodemon
// how to connect into db via shell: mongo --host 127.0.0.1:27017[/bulma_db]

// TO DO:
// 1. add debug, morgan
// viz https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/skeleton_website

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const session = require('express-session'); // can be used for assigning unique cookie ID
const parseurl = require('parseurl');
var async = require('async');

// db models
var User = require('./models/user');
var Sass = require('./models/sass');
var Css = require('./models/css');
var SassLabel = require('./models/sasslabel');
var CssLabel = require('./models/csslabel');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();
const port = 3000;
const mongoDB = 'mongodb://localhost/bulma_db';
let timestampHuman = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''); // remove

// session + cookies
// `app.use` == middleware specific for whole app
app.use(session({
  secret: 'some key for signing cookie values',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}));

function pathnm(reqObj) {
  return parseurl(reqObj).pathname;
}

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {};
  }
  var getPath = parseurl(req).pathname;
  req.session.views[getPath] = (req.session.views[getPath] || 0) + 1;
  next();
});

// mongo connection
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// get value for textarea
// TO DO LATER: put this sync function just before it's actually needed
var defaultTxtFile = 'defaultSass.txt';
var defaultSass = fs.readFileSync(defaultTxtFile, 'utf8');

// TO DO LATER: assign every user's draft (code inputed) with ordinal number based on his unique cookie, ie. "draft number 1" (first...), "draft number 2" (second), etc
var assignNumber = Date.now();

// express uses and set
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('views'));

app.set('view engine', 'pug');

// ROUTES - 2018-10-04 LETS ASSUME THAT FIRST PAGE PPL OPEN IS USERS aka USER DETAIL (NOT CUSTOMIZER /CUSTOMIZE)
/*
app.get('/', function (req, res) {
  res.redirect('/customize');
});
*/

app.get('/', indexRouter);
app.get('/users', usersRouter);


app.get('/customize', function (req, res) {

  res.render('customize', { title: 'CUSTOMIZE!',
                            defaults: defaultSass,
                            autoNumbered: assignNumber,
                            pageviews: req.session.views[pathnm(req)],
                            pathnm: pathnm(req)
                          });
});

app.post('/customize', (req, res) => {
  res.render('customize', { title: 'DONE - RESULTS:',
                            draftName: req.body.draftName,
                            inputAreaCode: req.body.inputAreaCode,
                            defaults: defaultSass,
                            autoNumbered: assignNumber,
                            pageviews: req.session.views[pathnm(req)],
                            pathnm: pathnm(req)
                           });
});

app.listen(3000, () => console.log(`${timestampHuman}  Listening on port ${port}!`));

// OFF TOPIC
// dalsi napad - jednoducha appka fetchujici nove prirustky v knihovnach
// a zobrazujici je na jednoduchem frontendu (napr. za posledni mesic)
// filtry napr. podle knihovna / obor / mkn / apod
// linky:
// https://slideplayer.cz/slide/2686755/
// https://aleph.mzk.cz/F/PGJNAUUFBRXVMM7TRD6L1KPDRPA1X3TV3GV9A2MEQ4FQA4SVAX-02904?func=file&file_name=help-1#ccl_codes
// https://developers.exlibrisgroup.com/aleph/apis/Aleph-RESTful-APIs/Records
// https://www.svkos.cz/data/novinky/leden/msvk-index.html
// na hp knihoven jsou asi vetsinou novinky / prirustky
// http://www.knihovny.net/

// DALSI A SUVERENNE NEJLEPSI
// APLIKACE NA DOPORUCOVANI KNIZEK PODLE DATABAZEKNIH
// NEJAKE TY PODOBNOSTI PODLE LIDI, CO MELI RADI ATD...

// DALSIIIIIIIIIIIIIIIII
// vlastni time tracking SW
// 1. rest api endpoint - node + mongoose // samotne cloudove ukladani jednotlivych entries
// 2. webovy klient - angular??
// 3. desktopovy klient () - v C s ncurses lib, uplne minimal funkce jako toggle desktop, pouzitelny i jen jako cli tool, bez ncurses "gui"
// 4. desktopovy demon - automaticke trackovani vsech pouzivanych aplikaci a oken prohlizece
// 5. mobilni klient - ???
// 6. sync s kalendarem etc etc
// 7. sync GL, BS, TMP etc...

// DALSI
// 0) soustredit se na fundamentalni zmeny (problemy, plusy) - "revolucnost" -, ktere ma nejaka radikalne nova technologie, jiz nic podobneho v minulosti nelze najit, na cloveka individualne a/nebo na spolecnost (lidstvo) - priklad: socialni site jako zcela novy typ zavislosti, s kterym se lidstvo teprve musi naucit zachazet (viz matous); mobily jako zcela novy typ zadouciho traveni volneho casu mladymi (viz skupina - syn); socialni site jako zcela novy typ komunikace, v kterem se realizuje "socialno (viz skupina - syn); etc...
// a) dalsi stupen Facebooku = lidi v meat space na sobe "nosi" AR profil s veskerymi funkcemi (snadnym UI atd.) jako FB profil, cili jdu na ulici a o lidech co potkavam na ulici si mohu zobrazovat stejne informace jako si muzu zobrazovat v soucasnosti na FB, kdyz sedim u pocitace; do toho nejaky startup vymysli "ocenovaci" mechanismus, nejake skore v nejake kvalite (napr. nejaka hodnota (moznost kvantifikace, tj. body, %, AD&D's 0-19 apod) nejake vlastnosti); aby toto skore neslo "ocheatovat" je zajisteno blockchainovou technologii; (muze to byt mnohem slozitejsi - kvalit muze byt mnoho, kvality mohou byt prohlizeny temi prostredky/medii, ktere se pouzivaji v soucasnosti na FB etc.) a ted - co se stane, kdyz tou kvalitou je treba dobra povest, anebo moralnost apod.? a co kdyz se to zvrtne a uz to nebude jen hra? jak z toho pak ven, kdyz je to sefovano blockchainem? na tom rozehrat pribeh, postavy (napr. specialisti umoznujici hackovat blockchain = kryptografove kteri umi prolomit soucasne algoritmy apod.), spolecnost (napr. dystopie, je to vyuzivano statni moci - aneb 1984 kdy lidi nesmiruje vsevidouci policejni stat, ale smiruji sami sebe navzajem socialni siti)
// b) novy lek zlepsujici moznosti, co a jak moc lze natrenovat, eeg neurofeedbackove metody desettisickrat... (booster "neuroplasticity") napr. deti se od prvni tridy uci krome cteni, psani, poctu trenovat mozek tak, ze od druhe tridy uz umi svuj mozek snadno pouzivat jako pocitacovou mys (resp. mnohem lepe nez mys, zkratka ovladac s velkym O - napr. oproti klavesnici mnohem rychlejsi a presnejsi zadavani pismen/textu, protoze staci jen ciste jazykovy konektom, pouhe "vybavovani si slov", kdezto pri klasickem psani musi mozek zapojovat mnohe dalsi konektomy - sladit motoriku apod.)
// c) pametovy/working memory implantat jako technologie, diky ktere v blizke budoucnosti vyvoj matematiky pokrocil tak vyznamne dopredu jako ne za celou dobu od eukleida; "vsechny velke orisky matematiky 20. stoleti byly vyreseny behem 5 let diky tomu, ze genialni mozky zacaly chrlit matematicke dukazy jak bata cvicky, kdyz jejich schopnost "videt" naraz sahodlouhy (milionprvkovy) dukaz prestala byt omezena na sedmiprvkovou mnozinu"... kam se za takove okolnosti posune veda? (kdyz spousta matematickych vynalezu byla vyzkoumana drive nez se objevily teorie prirodnich ved, ktere ji dokazaly vyuzit...)
// d) rozhodovaci konektomy mozku augmentovane (kyber-) o machine learning komputacne rychlejsi nez soucasne nejrychlejsi super pocitac (bud = bitcoin network, anebo IBM summit) a s instantnim (zero-lag) pristupem ke vsem datum sveta (internetu) - otazka "Jak by se lide s takovymito mozky v praxi rozhodovali? Jak by vypadaly filozoficke/politicke/socialni diskuze? Jak by vypadalo souziti v lidske spolecnost, kdyby vedle sebe zily normalni mozky a tyto supermozky? co by se delo, kdyz by se kazdy clovek s touto schopnosti de facto vzdy a o vsem mohl rozhodovat spravne s presnosti lim->nek?
// e) nevymyslet nove sci-fi technologie I) "h.g.wellsovsky", jako hypertrofie soucasnych technologii (pr. zacatek 20. st. - prvni letadla (Wrightové) > raketoplany), II) "asimovsky", jako I. obohacene o lidsky rozmer (pr. lidska etika > AI-robot), III) "stephensonovsky", jako kombinace soucasnych technologii a poznatku (pr. kombinik; lepe inkanator - kombinace poznatku kvantoveho mozku a poznatku platonismu/multiverse), IV) ... vsechny sci fi veci, co prectu, zkouset takto klasifikovat
// f) objev v blizke budoucnosti - ze moralni mozek (konektomy) pracuji pravdepodobnostne + experiment na lidech, kterym podaji drogu nutici mozek zpracovavat (komputovat) moralni jednani nikoliv mechanismy spojite matematiky/logiky, nybrz diskretni.. tj. v konecnem dusledku binarne (moralne) spravne X nespravne... cili moralni propozice/akty se diky temto research monkeys po urcite dobe vyzkumu stanou absolutni (uz ne 80 % vyhodit vyhybku, 20 % ne v situaci x; ale v situaci x 100 % vyhodit) a cele lidstvo je tak musi uznat... co se stane se svetem, kdyz uplne vsichni musi nutne a bez pochybnosti (jak panbickari, tak vedci, tak postmoderni filozofove) uznat urcite moralni pravdy jako absolutni (do te doby nebyvala situace)?
// g) nova droga - odpojovac bud urcitych hran, anebo urcitych vrcholu konektomu... cili ne droga znecitlivujici urcitou prostorove vymezenou cast mozku (spodni prefrontalni kortex etc), ani ne funkci (schopnost mentalizace, schopnost jazyka apod), ale opravdu jen urcity vrchol nebo hrana konektomu? "odpojovani chapano ne prostorove, ne jak to je mozne s aktualnimi lekarskymi znalostmi, ale skutecne odpojeni prvku konektomu bez ohledu na realnou (chemicky, lekarsky, fyzikalne) moznost takoveho odpojeni ve shode s aktualne platnymi poznatky". ukolem sci fi autora: prozkoumat, co by se stalo? jak by takovy clovek vypadal/jednal/jak spolecnost? etc
// h) jak bude vypadat clovek, kdyz se mu odpoji nektera defaultni sit, ale vse ostatni funguje tak, jak ma... co se stane s tim clovekem?
// i) neurofeedbackem vytrenovany mozek nejen jako dokonaly ovladac pocitace, ale jako dokonaly ovladac hmoty
// j) svet, v kterem jsou lidmi nahlizeny empiricke pravdy jako platonske realne veci
// k) uznam-li absolutni pravdivost platonskych matematickych pravd, a tedy i platonsky realismus, jsem zavazan i k uznani absolutni pravdivosti moralnich pravd? jak by vypadal svet, v kterem by o "absolutnosti" veskere empirie nikdo nepochyboval stejnou merou jako se nepochybuje o absolutnosti matematickych zakonu? a jak by vypadal svet, v kterem by se o absolutnosti empirie vubec nepochybovalo (jako o pythagorove vete v aktualnim svete), kdezto o matematickych propozicich by se pochybovalo (jako o empirii v aktual svete)?
// l) kdyz bych predhodil takoveto axiomy + teoremy (tj. uplne opacne nez s kterymi nase poznani pracuje) Proveru9, dokazal by dokazat, ze jsou to nesmysly? tj. ne matematicky "dukaz sporem", ale  "computational metaphysics dukaz sporem"? zkratka, muze Prover9 nejen ukazat, ktere dukazy jsou ok, ale i negativne - ktere skupiny vet nejsou ok?
// m) premisy: mozek = kvantovy pocitac + medicina a odvetvi CS "kvantove pocitace" na takove urovni, ze toho dokazi vyuzit; narativum: svet, kde neprobiha nam znamy cerny trh s lidskymi organy urcenymi pro transplantaci, ale svet, kdy tomuto trhu dominuje (99 % vsech techto zlocinu) obchod s konkretnim lidskym organem, mozkem; Intel/Nvidia/AMD jako globalni gangy; jak takovy svet vypada? ktere mozky jsou cennejsi a ktere mene? jak vypada typicky hunter techto organu? atd..
// "Ano, v Číně je přípustné odebírat orgány popraveným vězňům. Počet popravených v této zemi je asi 7500 až 8000 ročně. Dobrovolných dárců je velmi málo – desítky, max. stovky. To nestačí ani na pokrytí potřeb dle oficiální statistiky, natož k saturaci skutečných čísel."
// n) posunout nektere napr. Clarkovy povidky do soucasnosti... "9 miliard slov 2100".. co mnichove s pomoci kvantoveho super pocitace hledaji? tj. co musi najit/udelat, aby zacaly zhasinat hvezdy na obloze?
// o) docist info o zakonech v ramci antropickeho principu (kolik a jake) a jeden z nich upravit.. jak by pak vypadal vesmir?
// https://en.wikipedia.org/wiki/Fine-tuned_Universe If, for example, the strong nuclear force were 2% stronger than it is (for example, if the coupling constant representing its strength were 2% larger), while the other constants were left unchanged, diprotons would be stable; according to physicist Paul Davies, hydrogen would fuse into them instead of deuterium and helium.[9] This would drastically alter the physics of stars, and presumably preclude the existence of life similar to what we observe on Earth. The existence of the diproton would short-circuit the slow fusion of hydrogen into deuterium.

// AD IDEJE K ALGO+ML TRADING BOTU
// * vyhledavat klicova slova (bitcoin, btc apod) v https://npmcharts.com/
// * u jednotlivych zdroju sledovat - geolokaci, muz/zena apod.
// * neustale sebezhodnocovani a na zaklade toho vzdycky little adjust - napr. sledovat vsechny mozne i nemozne veliciny (napr. geolokace nejcastejsich tweetu), prubezne je sledovat a zpetnou vazbou promitat do parametru bota (napr. pri uspesnem prodeji v case t=x vyhodnotit nejen napr mnozstvi tweetu, ale i odkud prisly, a pokud prisly z nejakeho urciteho mista, napr. v Atlante jich bylo tehdy vice (sledovat vzdycky nejake ANOMALIE, vyboceni z rady), tak na zaklade toho i do budoucna pro vsechny casy t=x+n davat tweetum pochazejicim z Atlanty vetsi vahu... ale i toto do budoucna neustale revidovat a tunit)
