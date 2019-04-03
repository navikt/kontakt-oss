import { Selector } from 'testcafe';

fixture('Sende inn besvarelse').page('localhost:3000/kontakt-oss/');

test('Skal kunne sende inn en besvarelse', async t => {
    const rekrutteringKnapp = Selector('[data-testid="temaknapp"]').withText(
        'Rekruttering'
    );

    const fylkerDropdown = Selector('[data-testid="fylkerDropdown"]');
    const agderOption = fylkerDropdown.find('option').withText('Agder');

    const kommunerDropdown = Selector('[data-testid="kommunerDropdown"]');
    const arendalOption = kommunerDropdown.find('option').withText('Arendal');

    const bedriftsnavn = Selector('[data-testid="bedriftsnavn"]');
    const orgnr = Selector('[data-testid="orgnr"]');
    const fornavn = Selector('[data-testid="fornavn"]');
    const etternavn = Selector('[data-testid="etternavn"]');
    const epost = Selector('[data-testid="epost"]');
    const tlfnr = Selector('[data-testid="tlfnr"]');

    const sendInnKnapp = Selector('[data-testid="sendinn"]');
    const bekreftelse = Selector('[data-testid="bekreftelse"]');

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
