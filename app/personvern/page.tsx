export default function PersonvernPage() {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px', fontFamily: 'Arial, sans-serif', color: '#a8b8c8', background: '#0b1520', minHeight: '100vh', direction: 'ltr' }}>
            <div style={{ marginBottom: '32px' }}>
                <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#22a052', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}>
                    ← Tilbake til forsiden
                </a>
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#f0f4f8', marginBottom: '8px' }}>Personvernerklæring</h1>
            <p style={{ color: '#607080', marginBottom: '40px' }}>Sist oppdatert: {new Date().toLocaleDateString('no-NO')}</p>

            {[
                {
                    title: '1. Behandlingsansvarlig',
                    text: 'Ålesund Jamii Islamsk Senter (org.nr. 985 255 482), Latinskolegata 1, 6004 Ålesund er behandlingsansvarlig for dine personopplysninger.'
                },
                {
                    title: '2. Hvilke opplysninger samler vi inn?',
                    text: 'Vi samler inn følgende opplysninger ved medlemsregistrering: navn, personnummer, adresse, telefonnummer, e-postadresse og kjønn for deg og dine familiemedlemmer.'
                },
                {
                    title: '3. Hvorfor samler vi inn disse opplysningene?',
                    text: 'Opplysningene brukes til å registrere deg som medlem i Ålesund Moske, sende deg informasjon om arrangementer og kunngjøringer, og rapportere til relevante myndigheter i henhold til norsk lovgivning om trossamfunn.'
                },
                {
                    title: '4. Rettslig grunnlag',
                    text: 'Behandlingen er nødvendig for å oppfylle en avtale med deg (medlemskap) og for å overholde rettslige forpliktelser, jf. GDPR artikkel 6(1)(b) og (c).'
                },
                {
                    title: '5. Hvor lenge lagres opplysningene?',
                    text: 'Opplysningene lagres så lenge du er medlem av Ålesund Moske. Ved utmelding slettes opplysningene innen 30 dager, med mindre lovpålagt oppbevaringsplikt gjelder.'
                },
                {
                    title: '6. Dine rettigheter',
                    text: 'Du har rett til innsyn, retting, sletting og dataportabilitet. Du kan også protestere mot behandlingen. Kontakt oss på post@alesundmoske.no for å utøve dine rettigheter. Du kan også klage til Datatilsynet (datatilsynet.no).'
                },
                {
                    title: '7. Kontakt',
                    text: 'For spørsmål om personvern, kontakt: post@alesundmoske.no eller ring 48 29 27 63.'
                },
            ].map(section => (
                <div key={section.title} style={{ marginBottom: '28px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f0f4f8', marginBottom: '8px' }}>{section.title}</h2>
                    <p style={{ lineHeight: 1.8, fontSize: '15px' }}>{section.text}</p>
                </div>
            ))}
        </div>
    )
}