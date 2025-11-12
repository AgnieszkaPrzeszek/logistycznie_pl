import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-10 mt-10">
      <Card className="max-w-3xl mx-auto shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Polityka prywatności
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-700">
          <p>
            Twoja prywatność jest dla nas niezwykle ważna. Niniejsza polityka określa, w jaki sposób
            gromadzimy, wykorzystujemy i chronimy Twoje dane osobowe.
          </p>
          <p>
            - Dane użytkowników są gromadzone wyłącznie w celach świadczenia usług. <br />
            - Nie udostępniamy danych osobowych osobom trzecim bez zgody użytkownika. <br />-
            Użytkownik ma prawo do wglądu, poprawienia lub usunięcia swoich danych.
          </p>
          <p>
            Wszelkie pytania dotyczące prywatności prosimy kierować na adres:
            <strong>support@logistyczniepl.pl</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
