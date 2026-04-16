export type JsonLdNode = Record<string, unknown>;

export interface JsonLdProps {
  /** Um ou mais nós schema.org serializáveis */
  data: JsonLdNode | JsonLdNode[];
}

/**
 * Injeta JSON-LD no head via componente de servidor.
 * Por quê: dados estruturados explícitos para Google (Rich Results) sem depender apenas de heurísticas HTML.
 */
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          payload.length === 1 ? payload[0] : { "@context": "https://schema.org", "@graph": payload },
        ),
      }}
    />
  );
}
