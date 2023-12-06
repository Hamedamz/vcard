function downloadToFile(content, filename, contentType) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
}

const makeVCardVersion = () => `VERSION:3.0`;
const makeVCardFormattedName = (name) => `FN:${name}`;
const makeVCardName = (first_name, last_name) => `N:${last_name};${first_name};;;`;
const makeVCardOrg = (org) => `ORG:${org}`;
const makeVCardTitle = (title) => `TITLE:${title}`;
const makeVCardPhoto = (img) => `PHOTO;TYPE=JPEG;ENCODING=b:[${img}]`;
const makeVCardTel = (phone) => `TEL;TYPE=WORK,VOICE:${phone}`;
const makeVCardAdr = (address) => `ADR;TYPE=WORK,PREF:;;${address}`;
const makeVCardEmail = (email) => `EMAIL:${email}`;
const makeVCardNote = (note) => `NOTE:${note}`;
const makeVCardTimeStamp = () => `REV:${new Date().toISOString()}`;

function makeVCard() {
  let texts = [... new Set(Array.from(document.querySelectorAll(".wixui-rich-text__text")).map(i => i.textContent))];
  let vcard = `BEGIN:VCARD
${makeVCardVersion()}
${makeVCardFormattedName(`${texts[1]} ${texts[2]}`)}
${makeVCardName(texts[1], texts[2])}
${makeVCardOrg(texts[3])}
${makeVCardEmail(texts[4])}
${makeVCardNote(texts[5])}
${makeVCardTimeStamp()}
END:VCARD`;
  downloadToFile(vcard, `${texts[1]}_${texts[2]}.vcf`, 'text/vcard');
}
window.addEventListener("load", (event) => {
  downloadEl = document.querySelector("button.wixui-button");
  downloadEl.addEventListener('click', makeVCard);
});
