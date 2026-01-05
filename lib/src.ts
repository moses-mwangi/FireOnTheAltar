// lib/srs.ts
export interface ReviewStats {
  interval: number; // days until next review
  nextReview: Date;
  easeFactor: number; // 1.3 to 2.5
  reviewCount: number;
}

export class SRScheduler {
  // SM-2 Algorithm implementation
  static calculateNextReview(
    currentStats: ReviewStats,
    quality: number // 0-5 (how well you remembered)
  ): ReviewStats {
    let { interval, easeFactor, reviewCount } = currentStats;

    if (quality < 3) {
      // Incorrect response - reset interval but keep ease factor
      interval = 1;
      reviewCount = 0;
    } else {
      // Correct response
      if (reviewCount === 0) {
        interval = 1;
      } else if (reviewCount === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }

      // Update ease factor
      easeFactor =
        easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      easeFactor = Math.max(1.3, Math.min(2.5, easeFactor));
      reviewCount++;
    }

    // Calculate next review date
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    return {
      interval,
      nextReview,
      easeFactor,
      reviewCount,
    };
  }

  static getDueReviews(
    reviews: Array<{ nextReview: Date; note: string }>,
    limit: number = 20
  ) {
    const now = new Date();
    return reviews
      .filter((review) => review.nextReview <= now)
      .sort((a, b) => a.nextReview.getTime() - b.nextReview.getTime())
      .slice(0, limit);
  }
}
