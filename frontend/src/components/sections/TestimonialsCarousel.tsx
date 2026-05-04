'use client'

import { useState } from 'react'
import { Flex, Box, Avatar } from '@radix-ui/themes'
import { AppCard, AppText, AppButton, AppIcon, Icons } from '@/components/ui'
import { testimonials } from '@/data/testimonials'

const ITEMS_PER_VIEW = 3

export function TestimonialsCarousel() {
    const [index, setIndex] = useState(0)

    const total = testimonials.length
    const maxIndex = total - ITEMS_PER_VIEW

    const next = () => {
        if (index < maxIndex) setIndex(prev => prev + 1)
    }

    const prev = () => {
        if (index > 0) setIndex(prev => prev - 1)
    }

    const visibleItems = testimonials.slice(
        index,
        index + ITEMS_PER_VIEW
    )

    return (
        <Flex direction="column" align="center" gap="5" style={{ width: '100%' }}>

            <Flex gap="4" justify="center" wrap="wrap">
                {visibleItems.map((item, i) => (
                    <AppCard key={`${item.name}-${i}`} style={{ width: 280 }}>
                        <Flex direction="column" gap="3">

                            <AppText>"{item.comment}"</AppText>

                            <Flex align='center' gap="2">
                                <Avatar size="2" fallback={<Icons.user />} />
                                <Flex direction="column">
                                    <AppText weight="bold">{item.name}</AppText>
                                    <AppText size="1">{item.role}</AppText>
                                </Flex>
                            </Flex>

                        </Flex>
                    </AppCard>
                ))}
            </Flex>

            <Flex align="center" gap="5">

                <AppButton
                    variant="soft"
                    onClick={prev}
                    disabled={index === 0}
                >
                    <AppIcon name="chevronLeft" size={20} />
                </AppButton>

                <Flex gap="2">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <Box
                            key={i}
                            onClick={() => setIndex(i)}
                            style={{
                                width: i === index ? 18 : 8,
                                height: 8,
                                borderRadius: 999,
                                background:
                                    i === index ? 'var(--accent-9)' : 'var(--gray-5)',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                            }}
                        />
                    ))}
                </Flex>

                <AppButton
                    variant="soft"
                    onClick={next}
                    disabled={index === maxIndex}
                >
                    <AppIcon name="chevronRight" size={20} />
                </AppButton>

            </Flex>
        </Flex>
    )
}