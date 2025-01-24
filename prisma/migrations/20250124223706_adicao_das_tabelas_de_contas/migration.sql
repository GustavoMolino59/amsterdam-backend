-- CreateTable
CREATE TABLE "tb_fix_bills" (
    "id" SERIAL NOT NULL,
    "billTypeId" INTEGER NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_fix_bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_fix_bills_types" (
    "id" SERIAL NOT NULL,
    "bill_type" TEXT NOT NULL,
    "description" TEXT,
    "average" DOUBLE PRECISION,

    CONSTRAINT "tb_fix_bills_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_transactions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_fix_bill_user" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "bill_id" INTEGER NOT NULL,
    "others" DOUBLE PRECISION DEFAULT 0.0,
    "debts" DOUBLE PRECISION DEFAULT 0.0,
    "total_payable" DOUBLE PRECISION NOT NULL,
    "pay_day" TIMESTAMP(3),
    "amount_paid" DOUBLE PRECISION DEFAULT 0.0,
    "referenceMonth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_fix_bill_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_debts_user" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "value_debts" DOUBLE PRECISION NOT NULL,
    "payment_plan" TEXT,
    "installment_value" DOUBLE PRECISION,

    CONSTRAINT "tb_debts_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_fix_bills_types_bill_type_key" ON "tb_fix_bills_types"("bill_type");

-- AddForeignKey
ALTER TABLE "tb_fix_bills" ADD CONSTRAINT "tb_fix_bills_billTypeId_fkey" FOREIGN KEY ("billTypeId") REFERENCES "tb_fix_bills_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_fix_bill_user" ADD CONSTRAINT "tb_fix_bill_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_fix_bill_user" ADD CONSTRAINT "tb_fix_bill_user_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "tb_fix_bills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_debts_user" ADD CONSTRAINT "tb_debts_user_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
