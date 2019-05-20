import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


import './bio.css';


export default () => {
    AOS.init();
    return (
        <div id="bio">
            <div className="left d-lg-block d-none" data-aos="fade-right"
                data-aos-duration="3000" />
            <div className="biopict d-lg-block d-none" data-aos="fade-right"
                data-aos-duration="3000"></div>
            <div className="offset-lg-4 col-lg-8">
                <h2>Biografia</h2>
                <p className='quote-content'>Urodziła się w Gorlicach 15 grudnia 1958 r. Absolwentka Liceum Ogólnokształcącego 
                    im. Marcina Kromera w Gorlicach. Studia w Instytucie Wychowania Artystycznego Uniwersytetu
                    Marii Curie-Skłodowskiej w Lublinie.&nbsp; Dyplom z grafiki warsztatowej w pracowni prof.
                    Danuty Kołwzan - Nowickiej w 1981 roku.<br />Mieszka i tworzy w Gorlicach.</p>

                <div className='quote'>
                    <p className='quote-content'>Prace Aliny Zachariasz - Kuciakowskiej cechuje tak rzadko, szczeg&oacute;lnie
                    obecnie, spotykane skupienie, oszczędność środk&oacute;w oraz synteza, kt&oacute;ra nie jest oschła, geometryczna,
                    ale wrażliwie odrzucająca to, co nie służy pełnemu wyrazowi zawartemu w delikatności i niuansach cięcia.</p>

                    <p className='quote-author'><strong>Prof. Danuta Kołwzan-Nowicka</strong></p>
                </div>

                <div className='quote'>
                    <p className='quote-content'>Autorka programowo odrzuca dosłowność, a także
                                jednoznaczność zapisu zapraszając widza do dialogu, dyskusji,
                                 interpretacji znaczeń. Emocje, refleksje autorki zawarte w pracach graficznych 
                                 stają się emocjami oraz myślami odbiorcy.</p>
                    <p className='quote-author'><strong>Prof. Grzegorz Mazurek</strong></p>
                </div>
                <p>W mojej twórczości pojawia się niezmiennie, od czasu studiów, w rysunkach i grafice, człowiek; ludzka egzystencja, kondycja psychiczna, lęki, trudności. Walka z własnymi słabościami, pokonywanie barier i zahamowań, bunt, upadki, ale też ich przezwyciężanie. Pojawia się w niej wreszcie motyw nieuchronności, dojrzewania i przemijania.</p>
                <p>Fascynują mnie także drzewa - ich pnie, rodzaje kory, gałęzie - a więc niesamowite przyrodnicze faktury, przemiany i trwanie. Są one dla mnie uosobieniem ludzkiej natury, kojarzą mi się z naszą egzystencją i jej zawirowaniami, są świadkami nierozerwalnej więzi człowieka z naturą.</p>
                <p>Mimo to, moja twórczość nie jest pozbawiona prac lżejszych i zdecydowanie weselszych. Tworzę pastele i akwarele z podr&oacute;ży bliskich i dalekich, powstałe z zachwytu przyrodą, zabytkami, fascynującymi miejscami, barwami, fakturami czy światłem, a więc tym wszystkim, co daje chęć do życia, radość i siłę.</p>
                <p><strong>Grafika</strong> to linoryty odbijane zawsze ręcznie, nigdy nie odbijałam ich w prasie. Tnę małe płaszczyzny, drobnymi cięciami, starając&nbsp; się uzyskać&nbsp; jak najwięcej ciekawych faktur i odcieni. Choć teraz, &bdquo;przymusowo&rdquo; zrobiłam sobie od nich dłuższą przerwę, często grafika jest dla mnie wyznacznikiem mojej pracy tw&oacute;rczej...</p>
                <p><strong>Rysunki </strong>są w tej chwili dla mnie najważniejsze, są zapisem moich przemyśleń, przeżyć, moją opowieścią o życiu. Za pomocą bieli i czerni poprzez całą gamę szarości uzyskanych r&oacute;żnej twardości oł&oacute;wkami można pokazać bardzo wiele. Ja staram się pokazać, jak potrafię, zapis moich przeżyć...</p>
                <p><strong>Pastele </strong>zaczęły powstawać, kiedy przestałam robić linoryty - rysowane zwykle na czarnym papierze, początkowo były czarno-białe lub w szarościach. P&oacute;źniej zaczęłam wprowadzać kolory, ale stonowane&nbsp; &nbsp;Tłusta kredka w połączeniu z szorstką fakturą papieru daje chropowaty, nier&oacute;wny ślad, niczym malarstwo na bardzo grubo tkanym lnianym pł&oacute;tnie. Są to szkice, przerywniki, ćwiczenia i pomysły do dalszej pracy, a czasem samodzielne prace.</p>
                <p><strong>Akwarele </strong>&ndash;są malarskim zapisem moich wędr&oacute;wek, malowane lekko , ponieważ zależy mi na świetlistości i lekkości. Chcę sprostać &nbsp;wymogom techniki &ndash; uzyskaniu lekkości i delikatności w nakładaniu barw na papier, pokazać ulotność chwili i kruchość zjawisk. Są to obecnie ćwiczenia, kt&oacute;re mam nadzieję, rozwiną się w poważniejsze wypowiedzi.<br /> W pracach z Sycylii chcę pokazać niezwykłe światło i soczyste barwy przy morzu, a nasycone ż&oacute;łcią i&nbsp;wszelkimi odcieniami brąz&oacute;w &nbsp;w głębi&nbsp; lądu. Fascynujące są pejzaże wok&oacute;ł Etny. Światło na południu jest&nbsp; wyzwaniem, jest sprawdzianem biegłości&hellip;</p>
                <h5 className='quote-author font-italic'><strong>Alina Zachariasz - Kuciakowska</strong></h5>
                <p>&nbsp;</p>



            </div>
        </div>
    );
}