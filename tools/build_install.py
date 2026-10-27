#!/usr/bin/env python3
"""Generate install.html (the /install page) in all 11 site languages.
Run: python3 tools/build_install.py"""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
CMD = 'xattr -dr com.apple.quarantine /Applications/TakeSync.app'

T = {
'en': dict(title='Install TakeSync', sub='Mac with Apple Silicon · macOS 12 or later',
  note='<b>Please read before you open the app.</b> TakeSync is not yet notarized by Apple, so the first time you open it macOS warns that it “could not verify TakeSync is free of malware”. That’s expected — the app is safe, works offline and never uploads your media. Step 3 shows how to allow it once; it takes under a minute.',
  s1='Download', btn='Download TakeSync.dmg', p1='Open the downloaded file.',
  s2='Move to Applications', p2='Drag <b>TakeSync</b> onto the <b>Applications</b> folder in the window that opens.',
  s3='Allow it to open (once)', p3='Pick one of the two ways:',
  a='Option A (fastest): one command in Terminal', a1='Open <b>Terminal</b>: press <b>⌘ Space</b>, type <b>Terminal</b>, press Return.',
  a2='Copy this line, paste it into Terminal and press Return:', a3='Open TakeSync from Applications as usual.', copy='Copy',
  b='Option B: System Settings', bs=['Open TakeSync from Applications. When the warning appears, click <b>Done</b> (not “Move to Bin”).', 'Open <b>System Settings → Privacy &amp; Security</b>.', 'Scroll down to the message about TakeSync and click <b>Open Anyway</b>.', 'Confirm with your password or Touch ID, then click <b>Open Anyway</b> again.'],
  once='You only need to do this once. Updates install without the warning.',
  s4='Still not opening?', p4='Write to <a href="mailto:support@takesync.uk">support@takesync.uk</a> with your macOS version and a screenshot — we usually answer within a day.'),
'uk': dict(title='Встановлення TakeSync', sub='Mac з Apple Silicon · macOS 12 або новіша',
  note='<b>Прочитай, перш ніж відкривати програму.</b> TakeSync ще не нотаризований Apple, тому при першому запуску macOS попередить, що «не може перевірити, чи немає в TakeSync зловмисного ПЗ». Це нормально — програма безпечна, працює офлайн і нікуди не надсилає твої відео. Крок 3 показує, як дозволити її один раз; це менше хвилини.',
  s1='Завантаж', btn='Завантажити TakeSync.dmg', p1='Відкрий завантажений файл.',
  s2='Перенеси в Програми', p2='Перетягни <b>TakeSync</b> на папку <b>Applications (Програми)</b> у вікні, що відкрилося.',
  s3='Дозволь запуск (один раз)', p3='Обери один із двох способів:',
  a='Варіант A (найшвидший): одна команда в Терміналі', a1='Відкрий <b>Термінал</b>: натисни <b>⌘ Пробіл</b>, введи <b>Термінал</b> (або Terminal) і натисни Return.',
  a2='Скопіюй цей рядок, встав у Термінал і натисни Return:', a3='Відкривай TakeSync із Програм як звичайно.', copy='Копіювати',
  b='Варіант B: Системні параметри', bs=['Відкрий TakeSync із Програм. Коли з’явиться попередження, натисни <b>Готово</b> (не «Перемістити в Смітник»).', 'Відкрий <b>Системні параметри → Приватність і безпека</b>.', 'Прокрути вниз до повідомлення про TakeSync і натисни <b>Усе одно відкрити</b>.', 'Підтверди паролем або Touch ID і ще раз натисни <b>Усе одно відкрити</b>.'],
  once='Це потрібно лише раз. Оновлення ставляться без попередження.',
  s4='Все одно не відкривається?', p4='Напиши на <a href="mailto:support@takesync.uk">support@takesync.uk</a> версію macOS і скриншот — зазвичай відповідаємо протягом дня.'),
'de': dict(title='TakeSync installieren', sub='Mac mit Apple Silicon · macOS 12 oder neuer',
  note='<b>Bitte vor dem Öffnen lesen.</b> TakeSync ist noch nicht von Apple notarisiert. Beim ersten Öffnen meldet macOS daher, es könne „nicht überprüfen, ob TakeSync frei von Schadsoftware ist“. Das ist normal – die App ist sicher, arbeitet offline und lädt deine Medien nirgendwohin hoch. Schritt 3 zeigt, wie du sie einmalig erlaubst; das dauert keine Minute.',
  s1='Herunterladen', btn='TakeSync.dmg herunterladen', p1='Öffne die heruntergeladene Datei.',
  s2='In „Programme“ bewegen', p2='Ziehe <b>TakeSync</b> im geöffneten Fenster auf den Ordner <b>Programme</b>.',
  s3='Öffnen erlauben (einmalig)', p3='Wähle einen der beiden Wege:',
  a='Option A (am schnellsten): ein Befehl im Terminal', a1='Öffne das <b>Terminal</b>: <b>⌘ Leertaste</b> drücken, <b>Terminal</b> eingeben, Return drücken.',
  a2='Kopiere diese Zeile, füge sie ins Terminal ein und drücke Return:', a3='Öffne TakeSync wie gewohnt aus „Programme“.', copy='Kopieren',
  b='Option B: Systemeinstellungen', bs=['Öffne TakeSync aus „Programme“. Wenn die Warnung erscheint, klicke auf <b>Fertig</b> (nicht „In den Papierkorb“).', 'Öffne <b>Systemeinstellungen → Datenschutz &amp; Sicherheit</b>.', 'Scrolle nach unten zur Meldung über TakeSync und klicke auf <b>Dennoch öffnen</b>.', 'Bestätige mit Passwort oder Touch ID und klicke erneut auf <b>Dennoch öffnen</b>.'],
  once='Das ist nur einmal nötig. Updates werden ohne Warnung installiert.',
  s4='Öffnet sich immer noch nicht?', p4='Schreib an <a href="mailto:support@takesync.uk">support@takesync.uk</a> mit deiner macOS-Version und einem Screenshot – wir antworten meist innerhalb eines Tages.'),
'es': dict(title='Instalar TakeSync', sub='Mac con Apple Silicon · macOS 12 o posterior',
  note='<b>Léelo antes de abrir la app.</b> TakeSync aún no está notarizada por Apple, así que la primera vez macOS avisa de que «no puede verificar que TakeSync no contenga software malicioso». Es normal: la app es segura, funciona sin conexión y nunca sube tus archivos. El paso 3 explica cómo permitirla una vez; tarda menos de un minuto.',
  s1='Descarga', btn='Descargar TakeSync.dmg', p1='Abre el archivo descargado.',
  s2='Muévela a Aplicaciones', p2='Arrastra <b>TakeSync</b> a la carpeta <b>Aplicaciones</b> en la ventana que se abre.',
  s3='Permite abrirla (una vez)', p3='Elige una de las dos formas:',
  a='Opción A (la más rápida): un comando en Terminal', a1='Abre <b>Terminal</b>: pulsa <b>⌘ Espacio</b>, escribe <b>Terminal</b> y pulsa Retorno.',
  a2='Copia esta línea, pégala en Terminal y pulsa Retorno:', a3='Abre TakeSync desde Aplicaciones como siempre.', copy='Copiar',
  b='Opción B: Ajustes del Sistema', bs=['Abre TakeSync desde Aplicaciones. Cuando aparezca el aviso, pulsa <b>OK</b> (no «Trasladar a la papelera»).', 'Abre <b>Ajustes del Sistema → Privacidad y seguridad</b>.', 'Desplázate hasta el mensaje sobre TakeSync y pulsa <b>Abrir igualmente</b>.', 'Confirma con tu contraseña o Touch ID y vuelve a pulsar <b>Abrir igualmente</b>.'],
  once='Solo hace falta una vez. Las actualizaciones se instalan sin el aviso.',
  s4='¿Sigue sin abrirse?', p4='Escribe a <a href="mailto:support@takesync.uk">support@takesync.uk</a> con tu versión de macOS y una captura; solemos responder en un día.'),
'fr': dict(title='Installer TakeSync', sub='Mac avec Apple Silicon · macOS 12 ou ultérieur',
  note='<b>À lire avant d’ouvrir l’app.</b> TakeSync n’est pas encore notarisée par Apple : à la première ouverture, macOS indique qu’il « ne peut pas vérifier que TakeSync est exempte de logiciels malveillants ». C’est normal — l’app est sûre, fonctionne hors ligne et n’envoie jamais vos médias. L’étape 3 explique comment l’autoriser une fois ; moins d’une minute.',
  s1='Télécharger', btn='Télécharger TakeSync.dmg', p1='Ouvrez le fichier téléchargé.',
  s2='Placer dans Applications', p2='Faites glisser <b>TakeSync</b> sur le dossier <b>Applications</b> dans la fenêtre qui s’ouvre.',
  s3='Autoriser l’ouverture (une fois)', p3='Choisissez l’une des deux méthodes :',
  a='Option A (la plus rapide) : une commande dans le Terminal', a1='Ouvrez le <b>Terminal</b> : appuyez sur <b>⌘ Espace</b>, tapez <b>Terminal</b>, puis Entrée.',
  a2='Copiez cette ligne, collez-la dans le Terminal et appuyez sur Entrée :', a3='Ouvrez TakeSync depuis Applications comme d’habitude.', copy='Copier',
  b='Option B : Réglages Système', bs=['Ouvrez TakeSync depuis Applications. Quand l’alerte apparaît, cliquez sur <b>Terminé</b> (pas « Placer dans la corbeille »).', 'Ouvrez <b>Réglages Système → Confidentialité et sécurité</b>.', 'Faites défiler jusqu’au message concernant TakeSync et cliquez sur <b>Ouvrir quand même</b>.', 'Confirmez avec votre mot de passe ou Touch ID, puis cliquez à nouveau sur <b>Ouvrir quand même</b>.'],
  once='À faire une seule fois. Les mises à jour s’installent sans alerte.',
  s4='Ça ne s’ouvre toujours pas ?', p4='Écrivez à <a href="mailto:support@takesync.uk">support@takesync.uk</a> avec votre version de macOS et une capture d’écran — nous répondons en général sous 24 h.'),
'it': dict(title='Installare TakeSync', sub='Mac con Apple Silicon · macOS 12 o successivo',
  note='<b>Leggi prima di aprire l’app.</b> TakeSync non è ancora autenticata da Apple, quindi al primo avvio macOS avvisa che «non può verificare che TakeSync sia priva di malware». È normale: l’app è sicura, funziona offline e non carica mai i tuoi file. Il passo 3 mostra come consentirla una volta; serve meno di un minuto.',
  s1='Scarica', btn='Scarica TakeSync.dmg', p1='Apri il file scaricato.',
  s2='Sposta in Applicazioni', p2='Trascina <b>TakeSync</b> sulla cartella <b>Applicazioni</b> nella finestra che si apre.',
  s3='Consenti l’apertura (una volta)', p3='Scegli uno dei due modi:',
  a='Opzione A (la più veloce): un comando nel Terminale', a1='Apri il <b>Terminale</b>: premi <b>⌘ Spazio</b>, scrivi <b>Terminale</b> e premi Invio.',
  a2='Copia questa riga, incollala nel Terminale e premi Invio:', a3='Apri TakeSync da Applicazioni come al solito.', copy='Copia',
  b='Opzione B: Impostazioni di Sistema', bs=['Apri TakeSync da Applicazioni. Quando compare l’avviso, fai clic su <b>Fine</b> (non «Sposta nel Cestino»).', 'Apri <b>Impostazioni di Sistema → Privacy e sicurezza</b>.', 'Scorri fino al messaggio su TakeSync e fai clic su <b>Apri comunque</b>.', 'Conferma con password o Touch ID e fai di nuovo clic su <b>Apri comunque</b>.'],
  once='Serve una sola volta. Gli aggiornamenti si installano senza avviso.',
  s4='Ancora non si apre?', p4='Scrivi a <a href="mailto:support@takesync.uk">support@takesync.uk</a> con la versione di macOS e uno screenshot: di solito rispondiamo entro un giorno.'),
'pl': dict(title='Instalacja TakeSync', sub='Mac z Apple Silicon · macOS 12 lub nowszy',
  note='<b>Przeczytaj, zanim otworzysz aplikację.</b> TakeSync nie jest jeszcze notaryzowany przez Apple, więc przy pierwszym uruchomieniu macOS ostrzega, że „nie może sprawdzić, czy TakeSync nie zawiera złośliwego oprogramowania”. To normalne — aplikacja jest bezpieczna, działa offline i nigdzie nie wysyła Twoich plików. Krok 3 pokazuje, jak zezwolić na nią raz; to mniej niż minuta.',
  s1='Pobierz', btn='Pobierz TakeSync.dmg', p1='Otwórz pobrany plik.',
  s2='Przenieś do Aplikacji', p2='Przeciągnij <b>TakeSync</b> na folder <b>Aplikacje</b> w oknie, które się otworzy.',
  s3='Zezwól na otwarcie (raz)', p3='Wybierz jeden z dwóch sposobów:',
  a='Opcja A (najszybsza): jedno polecenie w Terminalu', a1='Otwórz <b>Terminal</b>: naciśnij <b>⌘ Spacja</b>, wpisz <b>Terminal</b> i naciśnij Return.',
  a2='Skopiuj ten wiersz, wklej go do Terminala i naciśnij Return:', a3='Otwieraj TakeSync z Aplikacji jak zwykle.', copy='Kopiuj',
  b='Opcja B: Ustawienia systemowe', bs=['Otwórz TakeSync z Aplikacji. Gdy pojawi się ostrzeżenie, kliknij <b>Gotowe</b> (nie „Przenieś do kosza”).', 'Otwórz <b>Ustawienia systemowe → Prywatność i ochrona</b>.', 'Przewiń do komunikatu o TakeSync i kliknij <b>Otwórz mimo to</b>.', 'Potwierdź hasłem lub Touch ID i ponownie kliknij <b>Otwórz mimo to</b>.'],
  once='Wystarczy zrobić to raz. Aktualizacje instalują się bez ostrzeżenia.',
  s4='Nadal się nie otwiera?', p4='Napisz na <a href="mailto:support@takesync.uk">support@takesync.uk</a>, podając wersję macOS i zrzut ekranu — zwykle odpowiadamy w ciągu dnia.'),
'hu': dict(title='A TakeSync telepítése', sub='Apple Silicon processzoros Mac · macOS 12 vagy újabb',
  note='<b>Olvasd el, mielőtt megnyitod az appot.</b> A TakeSyncet az Apple még nem hitelesítette, ezért első indításkor a macOS figyelmeztet, hogy „nem tudja ellenőrizni, hogy a TakeSync mentes-e a rosszindulatú szoftverektől”. Ez várható — az app biztonságos, offline működik, és sehová nem tölti fel a felvételeidet. A 3. lépés megmutatja, hogyan engedélyezd egyszer; egy percnél kevesebb.',
  s1='Letöltés', btn='TakeSync.dmg letöltése', p1='Nyisd meg a letöltött fájlt.',
  s2='Áthelyezés az Alkalmazásokba', p2='A megnyíló ablakban húzd a <b>TakeSync</b> ikont az <b>Alkalmazások</b> mappára.',
  s3='Megnyitás engedélyezése (egyszer)', p3='Válassz a két mód közül:',
  a='A lehetőség (leggyorsabb): egy parancs a Terminálban', a1='Nyisd meg a <b>Terminált</b>: nyomd meg a <b>⌘ Szóköz</b> billentyűt, írd be: <b>Terminál</b>, majd Return.',
  a2='Másold ki ezt a sort, illeszd be a Terminálba, és nyomj Returnt:', a3='Nyisd meg a TakeSyncet az Alkalmazásokból a szokásos módon.', copy='Másolás',
  b='B lehetőség: Rendszerbeállítások', bs=['Nyisd meg a TakeSyncet az Alkalmazásokból. Amikor megjelenik a figyelmeztetés, kattints a <b>Kész</b> gombra (ne a „Kukába helyezésre”).', 'Nyisd meg: <b>Rendszerbeállítások → Adatvédelem és biztonság</b>.', 'Görgess le a TakeSyncről szóló üzenethez, és kattints a <b>Megnyitás mégis</b> gombra.', 'Erősítsd meg jelszóval vagy Touch ID-val, majd kattints újra a <b>Megnyitás mégis</b> gombra.'],
  once='Ezt csak egyszer kell megtenni. A frissítések figyelmeztetés nélkül települnek.',
  s4='Még mindig nem nyílik meg?', p4='Írj a <a href="mailto:support@takesync.uk">support@takesync.uk</a> címre a macOS verziójával és egy képernyőképpel — általában egy napon belül válaszolunk.'),
'tr': dict(title='TakeSync’i kur', sub='Apple Silicon’lu Mac · macOS 12 veya üstü',
  note='<b>Uygulamayı açmadan önce oku.</b> TakeSync henüz Apple tarafından onaylanmadı (notarize edilmedi), bu yüzden ilk açılışta macOS “TakeSync’in kötü amaçlı yazılım içermediğini doğrulayamadığını” söyler. Bu beklenen bir durum — uygulama güvenli, çevrimdışı çalışır ve dosyalarını hiçbir yere yüklemez. 3. adım, bir kez nasıl izin vereceğini gösterir; bir dakikadan kısa sürer.',
  s1='İndir', btn='TakeSync.dmg’yi indir', p1='İndirilen dosyayı aç.',
  s2='Uygulamalar’a taşı', p2='Açılan pencerede <b>TakeSync</b>’i <b>Uygulamalar</b> klasörüne sürükle.',
  s3='Açılmasına izin ver (bir kez)', p3='İki yoldan birini seç:',
  a='Seçenek A (en hızlı): Terminal’de tek komut', a1='<b>Terminal</b>’i aç: <b>⌘ Boşluk</b>’a bas, <b>Terminal</b> yaz ve Return’e bas.',
  a2='Bu satırı kopyala, Terminal’e yapıştır ve Return’e bas:', a3='TakeSync’i Uygulamalar’dan her zamanki gibi aç.', copy='Kopyala',
  b='Seçenek B: Sistem Ayarları', bs=['TakeSync’i Uygulamalar’dan aç. Uyarı görünürse <b>Bitti</b>’ye tıkla (“Çöp Sepetine Taşı”ya değil).', '<b>Sistem Ayarları → Gizlilik ve Güvenlik</b>’i aç.', 'TakeSync ile ilgili mesaja kadar kaydır ve <b>Yine de Aç</b>’a tıkla.', 'Parolan veya Touch ID ile onayla, sonra yeniden <b>Yine de Aç</b>’a tıkla.'],
  once='Bunu yalnızca bir kez yapman gerekir. Güncellemeler uyarı olmadan yüklenir.',
  s4='Hâlâ açılmıyor mu?', p4='macOS sürümün ve bir ekran görüntüsüyle <a href="mailto:support@takesync.uk">support@takesync.uk</a> adresine yaz — genellikle bir gün içinde yanıtlıyoruz.'),
'ko': dict(title='TakeSync 설치', sub='Apple Silicon Mac · macOS 12 이상',
  note='<b>앱을 열기 전에 읽어 주세요.</b> TakeSync는 아직 Apple의 공증을 받지 않아, 처음 열 때 macOS가 “TakeSync에 악성 코드가 없는지 확인할 수 없다”고 경고합니다. 정상입니다. 앱은 안전하며 오프라인으로 작동하고 미디어를 어디에도 업로드하지 않습니다. 3단계에서 한 번 허용하는 방법을 안내합니다. 1분도 걸리지 않습니다.',
  s1='다운로드', btn='TakeSync.dmg 다운로드', p1='다운로드한 파일을 엽니다.',
  s2='응용 프로그램으로 이동', p2='열린 창에서 <b>TakeSync</b>를 <b>응용 프로그램</b> 폴더로 드래그합니다.',
  s3='열기 허용(한 번만)', p3='두 가지 방법 중 하나를 선택하세요:',
  a='방법 A(가장 빠름): 터미널에서 명령 하나', a1='<b>터미널</b>을 엽니다: <b>⌘ 스페이스</b>를 누르고 <b>터미널</b>을 입력한 뒤 Return.',
  a2='이 줄을 복사해 터미널에 붙여넣고 Return을 누릅니다:', a3='평소처럼 응용 프로그램에서 TakeSync를 엽니다.', copy='복사',
  b='방법 B: 시스템 설정', bs=['응용 프로그램에서 TakeSync를 엽니다. 경고가 나타나면 <b>완료</b>를 클릭합니다(“휴지통으로 이동” 아님).', '<b>시스템 설정 → 개인정보 보호 및 보안</b>을 엽니다.', 'TakeSync 관련 메시지까지 스크롤해 <b>그래도 열기</b>를 클릭합니다.', '암호나 Touch ID로 확인한 뒤 다시 <b>그래도 열기</b>를 클릭합니다.'],
  once='한 번만 하면 됩니다. 업데이트는 경고 없이 설치됩니다.',
  s4='그래도 열리지 않나요?', p4='macOS 버전과 스크린샷을 <a href="mailto:support@takesync.uk">support@takesync.uk</a>로 보내 주세요. 보통 하루 안에 답변드립니다.'),
'zh': dict(title='安装 TakeSync', sub='搭载 Apple 芯片的 Mac · macOS 12 或更高版本',
  note='<b>打开应用前请先阅读。</b>TakeSync 尚未经过 Apple 公证，因此首次打开时 macOS 会提示“无法验证 TakeSync 不含恶意软件”。这是正常现象——应用是安全的，离线运行，绝不会上传你的素材。第 3 步介绍如何允许一次，用时不到一分钟。',
  s1='下载', btn='下载 TakeSync.dmg', p1='打开下载的文件。',
  s2='移到“应用程序”', p2='在打开的窗口中，把 <b>TakeSync</b> 拖到 <b>应用程序</b> 文件夹。',
  s3='允许打开（仅一次）', p3='任选以下一种方式：',
  a='方式 A（最快）：在“终端”中运行一条命令', a1='打开<b>终端</b>：按 <b>⌘ 空格</b>，输入<b>终端</b>，按回车。',
  a2='复制这一行，粘贴到终端并按回车：', a3='像平常一样从“应用程序”打开 TakeSync。', copy='复制',
  b='方式 B：系统设置', bs=['从“应用程序”打开 TakeSync。出现警告时点击<b>完成</b>（不要点“移到废纸篓”）。', '打开<b>系统设置 → 隐私与安全性</b>。', '向下滚动到关于 TakeSync 的提示，点击<b>仍要打开</b>。', '用密码或触控 ID 确认，再次点击<b>仍要打开</b>。'],
  once='只需操作一次，之后的更新安装时不会再出现警告。',
  s4='还是打不开？', p4='请把 macOS 版本和截图发送到 <a href="mailto:support@takesync.uk">support@takesync.uk</a>，我们通常在一天内回复。'),
}
LANGS = [('en', 'English'), ('de', 'Deutsch'), ('fr', 'Français'), ('es', 'Español'), ('it', 'Italiano'), ('uk', 'Українська'), ('pl', 'Polski'), ('hu', 'Magyar'), ('tr', 'Türkçe'), ('zh', '中文'), ('ko', '한국어')]

def section(lang, t):
    return f'''<section lang="{lang}" data-lang="{lang}"{'' if lang == 'en' else ' hidden'}>
  <h1>{t['title']}</h1>
  <p class="legal-updated">{t['sub']}</p>
  <div class="dl-note">{t['note']}</div>
  <h2>1. {t['s1']}</h2>
  <p><a class="btn btn-primary btn-lg" href="/download/TakeSync.dmg" download>{t['btn']}</a></p>
  <p>{t['p1']}</p>
  <h2>2. {t['s2']}</h2>
  <p>{t['p2']}</p>
  <h2>3. {t['s3']}</h2>
  <p>{t['p3']}</p>
  <h3>{t['a']}</h3>
  <ol><li>{t['a1']}</li><li>{t['a2']}</li></ol>
  <div class="cmd"><code>{CMD}</code><button class="btn btn-ghost btn-sm copy" type="button">{t['copy']}</button></div>
  <ol start="3"><li>{t['a3']}</li></ol>
  <h3>{t['b']}</h3>
  <ol>{''.join(f'<li>{x}</li>' for x in t['bs'])}</ol>
  <p>{t['once']}</p>
  <h2>{t['s4']}</h2>
  <p>{t['p4']}</p>
</section>
'''

LOGO = '<svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><rect width="28" height="28" rx="7" fill="#171a20"/><rect x="5" y="9" width="2.4" height="10" rx="1.2" fill="#5b9cff"/><rect x="9" y="6" width="2.4" height="16" rx="1.2" fill="#4fd58a"/><rect x="13" y="10" width="2.4" height="8" rx="1.2" fill="#5b9cff"/><rect x="17" y="5" width="2.4" height="18" rx="1.2" fill="#4fd58a"/><rect x="21" y="9" width="2.4" height="10" rx="1.2" fill="#5b9cff"/></svg>'
options = ''.join(f'<option value="{c}">{n}</option>' for c, n in LANGS)
page = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Install TakeSync — TakeSync</title>
<meta name="description" content="How to install and open TakeSync on your Mac.">
<meta name="theme-color" content="#0e1014">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css?v=20261026c">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="nav-wrap">
  <nav class="nav container" aria-label="Main">
    <a href="/" class="brand" aria-label="TakeSync home">
      {LOGO}
      TakeSync
    </a>
    <div class="nav-links">
      <a href="/#features" data-i18n="nav.features">What it does</a>
      <a href="/#how" data-i18n="nav.how">How it works</a>
      <a href="/#compat" data-i18n="nav.compat">Compatibility</a>
      <a href="/#pricing" data-i18n="nav.pricing">Pricing</a>
      <a href="/#faq" data-i18n="nav.faq">FAQ</a>
    </div>
    <label class="lang">
      <span class="visually-hidden" data-i18n="nav.lang">Language</span>
      <select id="lang-select">{options}</select>
    </label>
    <a href="/download/TakeSync.dmg" download class="btn btn-primary btn-sm" data-i18n="nav.download">Download</a>
  </nav>
</header>
<main id="main" class="container narrow legal">
{''.join(section(c, T[c]) for c, _ in LANGS)}</main>
<script src="/i18n.js?v=20261026c"></script>
<script src="/install.js?v=20261026c"></script>
<script src="/track.js?v=1"></script>
</body>
</html>
'''
(ROOT / 'install.html').write_text(page, encoding='utf-8')
print('wrote install.html,', len(LANGS), 'languages')
