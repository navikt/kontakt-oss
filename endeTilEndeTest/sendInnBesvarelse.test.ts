import { Selector } from 'testcafe';

fixture('Sende inn besvarelse').page('localhost:3000/kontakt-oss/kontaktskjema');

test('Skal kunne sende inn en besvarelse', async t => {
    const rekrutteringKnapp = Selector('[data-testid="temaknapp"]').withText(
        'rekruttering'
    );

    const kommune = Selector('[data-testid="kommune"]');

    const bedriftsnavn = Selector('[data-testid="bedriftsnavn"]');
    const orgnr = Selector('[data-testid="orgnr"]');
    const navn = Selector('[data-testid="navn"]');
    const epost = Selector('[data-testid="epost"]');
    const tlfnr = Selector('[data-testid="tlfnr"]');

    const sendInnKnapp = Selector('[data-testid="sendinn"]');
    const bekreftelse = Selector('[data-testid="bekreftelse"]');

    await t
        .click(rekrutteringKnapp)
        .expect(kommune.exists)
        .ok()
        .typeText(kommune, 'Arendal')
        .typeText(bedriftsnavn, 'Bedriftsnavn')
        .typeText(orgnr, '999999999')
        .typeText(navn, 'Ivar Aasen')
        .typeText(epost, 'test@test.no')
        .typeText(tlfnr, '12345678')

        .click(sendInnKnapp)
        .expect(bekreftelse.exists)
        .ok();
});
