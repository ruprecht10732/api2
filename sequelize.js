const sequelize = require("sequelize");
const UserModel = require("./models/user.model.js");
const RoleModel = require("./models/role.model.js");
const PermissionModel = require("./models/permission.model");
const RoleToPermissionModel = require("./models/RoleToPermission.model.js");
const UserAddressModel = require("./models/UserAddress.model.js");
const UserDetailsModel = require("./models/UserDetails.model.js");
const UserEmergencyContactModel = require("./models/UserEmergencyContact.model.js");
const UserIdentityModel = require("./models/UserIdentity.model.js");
const UserToRoleModel = require("./models/UserToRole.model.js");
const LocationsModel = require("./models/location.model.js");
const VestigingenModel = require("./models/vestigingen.model.js");
const ManagerModel = require("./models/manager.model.js");
const DepartmentEmployeesModel = require("./models/DepartmentEmployees.model.js");
const SalaryModel = require("./models/Salary.model.js");
const TimeSheetModel = require("./models/TimeSheet.model.js");
const CostCenterModel = require("./models/CostCenter.model.js");
const ProjectModel = require("./models/Projects.model.js");
const ActivitiesModel = require("./models/Activities.model.js");
const ActivityCodesModel = require("./models/ActivityCodes.model.js");
const AvailabilityDaysModel = require("./models/AvailabilityDays.model.js");
const AvailabilityHoursModel = require("./models/AvailabilityHours.model.js");
const Login = require("./models/login.model.js");
const InviteesModel = require("./models/Invitees.model");
const SignRequestModel = require("./models/SignRequest.model.js");
const UserBankDetailsModel = require("./models/UserBankDetails.model");
const UserIdPathModel = require("./models/UserIdPath.model.js");
const UserContractPathModel = require("./models/UserContractPath.model.js");
const UserTaxFormModel = require("./models/UserTaxForm.model.js");
const UserConfidentialityPathModel = require("./models/UserConfidentialityPath.model.js");

//Database
const db = require("./config/database.js");

// Test DB

db.authenticate()
  .then(() => console.log("Database is working...."))
  .catch((err) => console.log(err));

Login.belongsTo(UserModel, {
  foreignKey: "email",
  targetKey: "email",
});

InviteesModel.belongsTo(ManagerModel);
InviteesModel.belongsTo(VestigingenModel);

SignRequestModel.belongsTo(UserModel);
UserModel.hasMany(SignRequestModel);

UserIdPathModel.belongsTo(UserModel);
UserModel.hasOne(UserIdPathModel);

UserContractPathModel.belongsTo(UserModel);
UserModel.hasOne(UserContractPathModel);

UserTaxFormModel.belongsTo(UserModel);
UserModel.hasOne(UserTaxFormModel);

UserConfidentialityPathModel.belongsTo(UserModel);
UserModel.hasOne(UserConfidentialityPathModel);

Login.belongsTo(UserModel);
UserModel.hasOne(Login);

UserAddressModel.belongsTo(UserModel);
UserModel.hasOne(UserAddressModel);

UserDetailsModel.belongsTo(UserModel);
UserModel.hasOne(UserDetailsModel);

UserIdentityModel.belongsTo(UserModel);
UserModel.hasOne(UserIdentityModel);

UserEmergencyContactModel.belongsTo(UserModel);
UserModel.hasOne(UserEmergencyContactModel);

UserBankDetailsModel.belongsTo(UserModel);
UserModel.hasOne(UserBankDetailsModel);

LocationsModel.belongsTo(VestigingenModel);
VestigingenModel.hasOne(LocationsModel);

ProjectModel.belongsTo(VestigingenModel);
VestigingenModel.hasOne(ProjectModel);

ProjectModel.belongsTo(UserModel);
UserModel.hasOne(ProjectModel);

DepartmentEmployeesModel.belongsTo(UserModel);
UserModel.hasMany(DepartmentEmployeesModel);

DepartmentEmployeesModel.belongsTo(VestigingenModel);
VestigingenModel.hasOne(DepartmentEmployeesModel);

SalaryModel.belongsTo(UserModel);
UserModel.hasMany(SalaryModel);

TimeSheetModel.belongsTo(UserModel);
UserModel.hasMany(TimeSheetModel);

UserModel.hasOne(ManagerModel);

VestigingenModel.hasOne(ManagerModel);

UserToRoleModel.belongsTo(UserModel);
UserToRoleModel.belongsTo(RoleModel);
RoleToPermissionModel.belongsTo(PermissionModel);
RoleToPermissionModel.belongsTo(RoleModel);

TimeSheetModel.belongsTo(CostCenterModel);
ActivitiesModel.belongsTo(ProjectModel);
ActivitiesModel.belongsTo(ActivityCodesModel);
AvailabilityHoursModel.belongsTo(UserModel);
AvailabilityDaysModel.belongsTo(UserModel);

// if (process.env.NODE_ENV === "PRODUCTION") {
//   db.sync({ force: false })
//     .then(() => {
//       console.log(`Database & tables created!`);
//     })
//     .catch((err) => console.log(err));
// } else {
//   db.sync({ force: false })
//     .then(() => {
//       console.log(`Database & tables created!`);
//     })
//     .catch((err) => console.log(err));
// }
