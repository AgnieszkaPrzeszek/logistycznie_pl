import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function CookiePolicy() {
  return (
    <div className="container mx-auto py-10 mt-10">
      <Card className="max-w-3xl mx-auto shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Polityka plików cookie
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-700">
          <p>
            Serwis LogistyczniePL wykorzystuje pliki cookie w celu zapewnienia prawidłowego
            działania strony, analizy ruchu oraz personalizacji treści.
          </p>
          <p>
            - Pliki cookie pomagają nam zrozumieć, w jaki sposób korzystasz z naszej strony. <br />
            - Możesz w każdej chwili zmienić ustawienia dotyczące cookie w swojej przeglądarce.{' '}
            <br />- Nie wykorzystujemy plików cookie do przekazywania danych osobowych podmiotom
            trzecim.
          </p>
          <p>
            Korzystając z naszej strony, wyrażasz zgodę na używanie plików cookie zgodnie z tą
            polityką.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
