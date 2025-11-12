import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Terms() {
  return (
    <div className="container mx-auto py-10 mt-10">
      <Card className="max-w-3xl mx-auto shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">Regulamin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-700">
          <p>
            Niniejszy regulamin określa zasady korzystania z serwisu LogistyczniePL. Prosimy o
            dokładne zapoznanie się z postanowieniami przed rozpoczęciem korzystania z naszych
            usług.
          </p>
          <p>
            1. Korzystanie z serwisu jest równoznaczne z akceptacją niniejszego regulaminu.
            <br />
            2. Serwis zastrzega sobie prawo do wprowadzania zmian w treści regulaminu.
            <br />
            3. Wszelkie materiały zamieszczone w serwisie są chronione prawami autorskimi.
          </p>
          <p>
            Dziękujemy za korzystanie z naszego serwisu. W razie pytań — prosimy o kontakt z naszym
            zespołem.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
