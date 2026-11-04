
import { z } from "zod";

export const promotionSchema = z
  .object({
    sku: z.string().trim().min(1, "SKU é obrigatório"),

    nome: z.string().trim().min(1, "Nome é obrigatório"),

    custo: z
      .number()
      .finite()
      .positive("Custo deve ser maior que zero"),

    preco_atual: z
      .number()
      .finite()
      .positive("Preço atual deve ser maior que zero"),

    preco_promocional: z
      .number()
      .finite()
      .positive("Preço promocional deve ser maior que zero"),
  })
  .refine(
    (product) =>
      product.preco_promocional <= product.preco_atual,
    {
      message:
        "Preço promocional não pode superar o preço atual",
      path: ["preco_promocional"],
    },
  );

export type Promotion = z.infer<typeof promotionSchema>;
