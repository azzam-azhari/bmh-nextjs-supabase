import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const faqs = [
    {
        question: "Apa itu Baitul Maal Hidayatullah (BMH)?",
        answer: "BMH (Baitul Maal Hidayatullah) adalah Lembaga Amil Zakat Nasional (LAZNAS) yang berdedikasi untuk memberdayakan masyarakat melalui pengelolaan dana zakat, infaq, sedekah, dan wakaf (ZISWAF) serta dana sosial kemanusiaan lainnya."
    },
    {
        question: "Bagaimana cara berdonasi di BMH?",
        answer: "Anda dapat berdonasi melalui portal online kami, transfer bank ke rekening resmi BMH, atau mengunjungi gerai dan kantor layanan BMH terdekat di kota Anda."
    },
    {
        question: "Program apa saja yang menjadi fokus BMH?",
        answer: "Fokus utama program BMH meliputi pendidikan (beasiswa cendekia), kesehatan (layanan medis gratis), ekonomi (pemberdayaan UMKM), dan dakwah pedalaman."
    },
    {
        question: "Apakah BMH menyalurkan bantuan untuk daerah pelosok?",
        answer: "Ya, BMH memiliki jaringan luas yang menjangkau lebih dari 34 provinsi di Indonesia, dengan fokus utama pada daerah pedalaman, perbatasan, dan pulau terluar (3T)."
    },
    {
        question: "Bagaimana cara mengetahui laporan penyaluran donasi?",
        answer: "Laporan penyaluran donasi dipublikasikan secara berkala melalui website resmi, media sosial, majalah bulanan, dan laporan tahunan yang diaudit oleh kantor akuntan publik."
    }
];

export default function FaqSection() {
    return (
        <section className="py-12 sm:py-16 md:py-24 bg-muted/50">
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="flex flex-col items-center text-center space-y-4 mb-8 sm:mb-12">
                    <Badge variant="outline" className="text-xs sm:text-sm">Pertanyaan Umum</Badge>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl">
                        Temukan jawaban untuk pertanyaan yang paling sering diajukan seputar BMH dan layanan kami.
                    </p>
                </div>

                <div className="bg-background rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm border">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left text-sm sm:text-base hover:text-primary transition-colors">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
