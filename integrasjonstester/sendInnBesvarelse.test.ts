import { Selector } from 'testcafe';

fixture('Sende inn besvarelse').page('localhost:3000/kontakt-oss/');

test('Skal kunne sende inn en besvarelse', async t => {
    // Mulig const rekrutteringKnapp = Selector('div.temaknapp:nth-child(1)');
    const rekrutteringKnapp = Selector('div.temaknapp').withText(
        'Rekruttering'
    );

    const fylkerDropdown = Selector('select').withText('');
    const agderOption = fylkerDropdown.find('option').withText('Agder');

    // Er det bedre å gjøre select basert på plassering i skjema?
    // const kommunerDropdown = Selector('div.skjemaelement:nth-child(2)');
    const kommunerDropdown = Selector('div.skjemaelement').withText(
        'Hvilken kommune ligger arbeidsplassen i?'
    );
    const arendalOption = kommunerDropdown.find('option').withText('Arendal');

    // Også mulig med const bedriftsnavn = Selector('div.skjemaelement:nth-child(3)');
    const bedriftsnavn = Selector('div.skjemaelement').withText(
        'Bedriftens navn'
    );
    const orgnr = Selector('div.skjemaelement').withText('Organisasjonsnummer');
    const fornavn = Selector('div.skjemaelement').withText('Fornavn');
    const etternavn = Selector('div.skjemaelement').withText('Etternavn');
    const epost = Selector('div.skjemaelement').withText('E-post');
    const tlfnr = Selector('div.skjemaelement').withText('Telefonnummer');

    const sendInnKnapp = Selector('button').withAttribute('type', 'submit');

    const bekreftelse = Selector('div.nav-veilederpanel').withText(
        'Din henvendelse er mottatt'
    );

    await t
        .click(rekrutteringKnapp)
        .expect(fylkerDropdown.exists)
        .ok()
        .click(fylkerDropdown)
        .click(agderOption)
        .expect(kommunerDropdown.exists)
        .ok()
        .click(kommunerDropdown)
        .click(arendalOption)
        .typeText(bedriftsnavn, 'Bedriftsnavn')
        .typeText(orgnr, '999999999')
        .typeText(fornavn, 'Fornavn')
        .typeText(etternavn, 'Etternavn')
        .typeText(epost, 'test@test.no')
        .typeText(tlfnr, '12345678')
        .click(sendInnKnapp)
        .expect(bekreftelse.exists)
        .ok();
});
