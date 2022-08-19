const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class BoughtHistory extends Model {
  static init(sequelize) {
    return super.init(
      {
        boughtName: {
          type: DataTypes.STRING(300), // 주문 고유 번호
          allowNull: false,
        },
        deliveryNo: {
          type: DataTypes.STRING(60), // 송장번호
          allowNull: true,
        },
        deliveryCom: {
          type: DataTypes.STRING(100), // 배송사
          allowNull: true,
        },
        price: {
          type: DataTypes.INTEGER, // 결제 금액 (포인트 금액이 차감 안된 상품들 본연 금액)
          allowNull: false,
          defaultValue: 0,
        },
        name: {
          type: DataTypes.STRING(50), // 구매자 성명
          allowNull: false,
        },
        mobile: {
          type: DataTypes.STRING(50), // 연락처
          allowNull: false,
        },
        payWay: {
          type: DataTypes.STRING(50), // 구매방식
          allowNull: false,
        },
        usePoint: {
          type: DataTypes.BOOLEAN, // 포인트 사용 여부
          allowNull: false,
          defaultValue: false,
        },
        pointPrice: {
          type: DataTypes.INTEGER, // 사용한 포인트 금액
          allowNull: false,
          defaultValue: false,
        },
        postCode: {
          type: DataTypes.STRING(10), // 우편번호
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING(300), // 주소
          allowNull: false,
        },
        detailAddress: {
          type: DataTypes.STRING(500), // 상세주소
          allowNull: false,
        },
        deliveryStatus: {
          type: DataTypes.STRING(500), // 배송상태
          allowNull: false,
          defaultValue: 0,
        },
        toSales: {
          type: DataTypes.BOOLEAN, // 세일즈의 구매내역인지 아닌지 여부
          allowNull: false,
          defaultValue: false,
        },
        isSubmit: {
          type: DataTypes.BOOLEAN, // 주문취소 및 환불 신청 여부
          allowNull: false,
          defaultValue: false,
        },
        submitedAt: {
          type: DataTypes.DATE, // 주문취소 및 환불 신청 여부
          allowNull: null,
        },
        impUid: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        merchantUid: {
          type: DataTypes.STRING(150),
          allowNull: true,
        },
        etc: {
          type: DataTypes.STRING(3000), // 기타 요청사항
          allowNull: true,
        },
        price: {
          type: DataTypes.INTEGER, // 가격
          allowNull: false,
          defaultValue: 0,
        },
        deliveryPrice: {
          type: DataTypes.INTEGER, // 배송 가격
          allowNull: false,
          defaultValue: 0,
        },
        vBankDate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        vbankHolder: {
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        vbankName: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        vbankNum: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        isCompleted: {
          type: DataTypes.BOOLEAN, // 무통장 입금 및 가상계좌 처리 여부
          allowNull: false,
          defaultValue: false,
        },
        completedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        modelName: "BoughtHistory",
        tableName: "boughtHistorys",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.BoughtHistory.belongsTo(db.User);
  }
};
