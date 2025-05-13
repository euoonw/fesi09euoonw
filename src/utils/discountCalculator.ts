const applyPriceDiscount = (price: number) => {
  if (price >= 200000) return price * 0.8; // 20% 할인
  if (price >= 100000) return price * 0.9; // 10% 할인
  if (price >= 50000) return price * 0.95; // 5% 할인
  return price;
};

export type Membership = "regular" | "silver" | "gold" | "vip";

const applyMembershipDiscount = (price: number, membership: Membership) => {
  const discountRate = {
    regular: 1,
    vip: 0.9,
    gold: 0.95,
    silver: 0.98,
  };
  return price * (discountRate[membership] || 1);
};

export type Coupon = {
  type: "fixed" | "percentage";
  value: number;
};

const applyCouponDiscount = (price: number, coupon?: Coupon) => {
  // coupon이 없는 경우, 할인 없음
  if (!coupon) return price;
  // 정액 쿠폰인 경우, 가격에서 쿠폰 값을 빼줌
  if (coupon.type === "fixed") return price - coupon.value;
  // 정률 쿠폰인 경우, 가격에서 쿠폰 값을 곱해줌
  if (coupon.type === "percentage") return price * (1 - coupon.value / 100);
  return price;
};

export const calculatePrice = (
  price: number,
  customer: {
    membership: Membership;
    coupon?: Coupon;
  },
) => {
  // 1. 총 가격에 대한 할인 적용
  const priceAfterPriceDiscount = applyPriceDiscount(price);
  // 2. 멤버십에 따른 할인 적용
  const priceAfterMembershipDiscount = applyMembershipDiscount(
    priceAfterPriceDiscount,
    customer.membership,
  );
  // 3. 쿠폰에 따른 할인 적용
  const priceAfterCouponDiscount = applyCouponDiscount(
    priceAfterMembershipDiscount,
    customer.coupon,
  );
  // 4. 최종 가격 반환
  return priceAfterCouponDiscount;
};
