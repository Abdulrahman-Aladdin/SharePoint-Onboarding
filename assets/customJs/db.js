class Database {
  _data = [];
  _idCounter = 1;

  constructor() {
    const storedData = localStorage.getItem("DB");

    if (storedData) {
      const { data, idCounter } = JSON.parse(storedData);
      this._data = data;
      this._idCounter = idCounter;
      return;
    } else {
      this._data = [
        {
          id: 1,
          firstNameEn: "Ahmed",
          lastNameEn: "Tamer",
          positionEn: "Software Engineer",
          age: 22,
          email: "a@gmail.com",
          salary: 5000,
          joinDate: "2022-01-15",
          addressEn: "123 Main St, Cityville",
          phoneNumber: "123-456-7890",
          firstNameAr: "أحمد",
          lastNameAr: "تامر",
          positionAr: "مهندس برمجيات",
          addressAr: "123 الشارع الرئيسي، مدينة فيل",
        },
        {
          id: 2,
          firstNameEn: "Sara",
          lastNameEn: "Ali",
          positionEn: "Product Manager",
          age: 29,
          email: "s@gmail.com",
          salary: 6000,
          joinDate: "2021-03-22",
          addressEn: "456 Oak St, Townsville",
          phoneNumber: "987-654-3210",
          firstNameAr: "سارة",
          lastNameAr: "علي",
          positionAr: "مدير المنتج",
          addressAr: "456 شارع البلوط، مدينة تاون",
        },
        {
          id: 3,
          firstNameEn: "Omar",
          lastNameEn: "Hassan",
          positionEn: "UX Designer",
          age: 31,
          email: "o@gmail.com",
          salary: 5500,
          joinDate: "2020-07-30",
          addressEn: "789 Pine St, Villageville",
          phoneNumber: "555-123-4567",
          firstNameAr: "عمر",
          lastNameAr: "حسن",
          positionAr: "مصمم تجربة المستخدم",
          addressAr: "789 شارع الصنوبر، قرية فيل",
        },
        {
          id: 4,
          firstNameEn: "Lina",
          lastNameEn: "Khaled",
          positionEn: "Data Analyst",
          age: 27,
          email: "l@gmail.com",
          salary: 5200,
          joinDate: "2019-11-12",
          addressEn: "321 Maple St, Hamletville",
          phoneNumber: "444-987-6543",
          firstNameAr: "لينا",
          lastNameAr: "خالد",
          positionAr: "محللة بيانات",
          addressAr: "321 شارع الميبل، قرية هاملت",
        },
      ];

      this._idCounter = 5;
      this._save();
      "Initialized with default data:", this._data;
    }
  }

  _save() {
    localStorage.setItem(
      "DB",
      JSON.stringify({ data: this._data, idCounter: this._idCounter })
    );
  }

  getAll() {
    return [...this._data];
  }

  getById(id) {
    return this._data.find((item) => item.id === id);
  }

  create(item) {
    item.id = this._idCounter++;
    this._data.push(item);
    this._save();
    return item;
  }

  update(id, updatedItem) {
    const index = this._data.findIndex((item) => item.id === id);

    if (index !== -1) {
      this._data[index] = { id, ...updatedItem };
      this._save();
      return this._data[index];
    }

    return null;
  }

  delete(id) {
    const index = this._data.findIndex((item) => item.id === id);
    if (index !== -1) {
      const deletedItem = this._data.splice(index, 1)[0];
      this._save();
      return deletedItem;
    }
    return null;
  }
}

const db = new Database();
export default db;
