import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    // Base: tipografia premium com tracking mais aberto
    "group/button relative inline-flex shrink-0 items-center justify-center",
    "rounded-xl border border-transparent font-semibold tracking-wide whitespace-nowrap",
    "bg-clip-padding select-none cursor-pointer",
    // Transições suaves em todas as propriedades visuais
    "transition-all duration-200 ease-out",
    // Focus: anel visível para acessibilidade
    "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-40",
    // SVG interno
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        /**
         * CTA primário — amber dourado.
         * Multicamada: gradiente + inset highlight + shadow colorida + glow no hover.
         */
        amber: [
          "border-amber-400/30 text-stone-950",
          "bg-gradient-to-b from-amber-300 via-amber-400 to-amber-500",
          // Inset: borda superior luminosa + sombra colorida
          "shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_-1px_0_rgba(0,0,0,0.1)_inset,0_4px_20px_rgba(245,158,11,0.3)]",
          // Hover: levanta + glow intensifica
          "hover:from-amber-200 hover:via-amber-300 hover:to-amber-400",
          "hover:shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_-1px_0_rgba(0,0,0,0.1)_inset,0_8px_32px_rgba(245,158,11,0.5),0_0_0_1px_rgba(245,158,11,0.3)]",
          "hover:-translate-y-[1px]",
          // Active: afunda
          "active:translate-y-0 active:from-amber-400 active:to-amber-600",
          "active:shadow-[0_1px_0_rgba(0,0,0,0.1)_inset]",
          "focus-visible:ring-amber-500/60",
        ].join(" "),

        /**
         * CTA secundário — borda amber, background quase transparente.
         * Funciona em dark e light.
         */
        "amber-outline": [
          "border-amber-500/40 bg-transparent text-amber-600",
          "dark:text-amber-300",
          "shadow-[0_0_0_0_rgba(245,158,11,0)]",
          "hover:border-amber-500/70 hover:bg-amber-50 hover:text-amber-700",
          "hover:shadow-[0_4px_16px_rgba(245,158,11,0.2)]",
          "dark:hover:bg-amber-500/10 dark:hover:text-amber-200",
          "focus-visible:ring-amber-500/50",
        ].join(" "),

        /**
         * Primary default: foreground puro — máximo contraste.
         */
        default: [
          "bg-foreground text-background",
          "shadow-[0_1px_0_rgba(255,255,255,0.1)_inset]",
          "hover:bg-foreground/90 hover:-translate-y-[1px]",
          "hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)]",
          "active:translate-y-0",
          "focus-visible:ring-foreground/40",
        ].join(" "),

        /**
         * Glass — para superfícies translúcidas (cards escuros, overlays).
         */
        glass: [
          "border-white/15 bg-white/8 text-foreground backdrop-blur-md",
          "shadow-[0_1px_0_rgba(255,255,255,0.12)_inset]",
          "hover:border-white/25 hover:bg-white/14 hover:-translate-y-[1px]",
          "hover:shadow-[0_4px_20px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.15)_inset]",
          "active:translate-y-0",
          "focus-visible:ring-white/30",
        ].join(" "),

        /**
         * Outline — borda sutil, semântico para ações secundárias.
         */
        outline: [
          "border-border/60 bg-transparent text-foreground",
          "hover:border-foreground/30 hover:bg-muted/60 hover:-translate-y-[1px]",
          "hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
          "active:translate-y-0",
          "focus-visible:ring-foreground/25",
        ].join(" "),

        /**
         * Secondary — fundo muted, para ações de suporte.
         */
        secondary: [
          "bg-secondary text-secondary-foreground border-transparent",
          "hover:bg-secondary/70 hover:-translate-y-[1px]",
          "focus-visible:ring-foreground/20",
        ].join(" "),

        /**
         * Ghost — sem borda, hover com fundo suave.
         */
        ghost: [
          "border-transparent bg-transparent text-muted-foreground",
          "hover:bg-muted/70 hover:text-foreground",
          "focus-visible:ring-foreground/20",
        ].join(" "),

        /**
         * Destructive — vermelho suave para ações destrutivas.
         */
        destructive: [
          "border-destructive/20 bg-destructive/10 text-destructive",
          "hover:bg-destructive/20 hover:-translate-y-[1px]",
          "focus-visible:ring-destructive/40",
        ].join(" "),

        link: "border-transparent bg-transparent text-amber-600 dark:text-amber-400 underline-offset-4 hover:underline focus-visible:ring-amber-500/40",
      },

      size: {
        xs:  "h-7 gap-1 rounded-lg px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm:  "h-8 gap-1.5 rounded-lg px-3 text-sm [&_svg:not([class*='size-'])]:size-3.5",
        default: "h-10 gap-2 px-4 text-sm",
        lg:  "h-11 gap-2 px-5 text-sm",
        xl:  "h-12 gap-2.5 px-6 text-base",
        "2xl": "h-14 gap-3 rounded-2xl px-8 text-[1.05rem]",
        icon:    "size-10 rounded-xl",
        "icon-sm": "size-8 rounded-lg [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-12 rounded-xl [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
