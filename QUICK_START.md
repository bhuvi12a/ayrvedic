# Inventory Management System - Quick Start Guide

## 🚀 Overview
Your inventory management system is now fully set up with:
- ✅ Backend API with batch tracking
- ✅ MongoDB models for storage
- ✅ Admin dashboard pages
- ✅ Real-time statistics
- ✅ User-friendly UI/UX

---

## 📍 Access Points

### Admin Panel
- **Main URL**: `/admin/dashboard`
- **Inventory Dashboard**: `/admin/dashboard/inventory`
- **Add Inventory**: `/admin/dashboard/add-inventory`
- **Batch Details**: `/admin/dashboard/inventory/[id]`

### API Endpoints
- **Base URL**: `/api/admin/inventory`
- **Batch Operations**: `/api/admin/inventory/batch`
- **Statistics**: `/api/admin/inventory/stats`

---

## 🔐 Authentication
All requests require JWT token:
```
Authorization: Bearer <your-jwt-token>
```

Token is stored in localStorage as `admin-token`.

---

## 📝 How to Use

### 1. **View Inventory Dashboard**
```
Navigate to: /admin/dashboard/inventory

You'll see:
- 6 key statistics cards
- Search & filter options
- Complete inventory table
- Stock distribution by location
```

### 2. **Add New Inventory**
```
Click: "+ Add Inventory" button

Fill in:
- Product ID (unique)
- Product Name
- Batch Number (unique)
- Manufacturing Date
- Expiry Date
- Quantity
- Location (optional)
- Low Stock Threshold

Submit to save
```

### 3. **Manage Batches**
```
Click: "View Batches" button on any product

You can:
- Select a batch
- Enter quantity used
- Click "Mark Used" to track usage
- Filter by batch status
- View detailed metrics
- Delete expired batches
```

### 4. **Monitor Stock Levels**
```
Color indicators show:
🟢 Green: Stock healthy (>30 days to expiry)
🟡 Yellow: Expiring soon (<30 days)
🔴 Red: Expired/Low stock

Progress bars show:
- Visual percentage of available stock
- Colors match status indicators
```

---

## 📊 Statistics Dashboard

### Cards Displayed
1. **Total Products** - All product SKUs in system
2. **Total Stock** - Total units across all batches
3. **Low Stock** - Items below threshold (click to filter)
4. **Expired** - Batches past expiry date
5. **Expiring Soon** - Batches expiring within 30 days
6. **Total Batches** - All batches across products

### Auto-Refresh
Stats update automatically every 30 seconds.

---

## 🔍 Search & Filter

### Search
- Type product name or ID
- Real-time filtering
- Case-insensitive

### Filter Buttons
- **All Items** - Show all inventory
- **Low Stock** - Show items below threshold
- **Active** - Show active products only

---

## 🎨 Color Coding

### Stock Status
```
🟢 Green   = Healthy (Available > Threshold)
🔴 Red     = Critical (Available ≤ Threshold)
🟡 Yellow  = Available but low
```

### Product Status
```
✅ Active       = In use
⏸️  Inactive    = Temporarily unavailable
❌ Discontinued = No longer in use
```

### Batch Status
```
🟢 Green   = Fresh (>30 days to expiry)
🟡 Yellow  = Expiring Soon (7-30 days)
🔴 Red     = Expired (Past expiry date)
```

---

## 📱 Mobile Friendly

All pages are fully responsive:
- ✅ Mobile (≤640px)
- ✅ Tablet (640-1024px)
- ✅ Desktop (>1024px)

---

## ⚙️ API Examples

### Get All Inventory
```bash
curl -H "Authorization: Bearer TOKEN" \
  https://yourdomain.com/api/admin/inventory
```

### Get Low Stock Items
```bash
curl -H "Authorization: Bearer TOKEN" \
  https://yourdomain.com/api/admin/inventory?low=true
```

### Create New Batch
```bash
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PROD001",
    "productName": "Ashwagandha",
    "batchNumber": "BATCH-2024-001",
    "manufacturingDate": "2024-01-15",
    "expiryDate": "2026-01-15",
    "quantity": 100,
    "location": "Main Store",
    "lowStockThreshold": 10
  }' \
  https://yourdomain.com/api/admin/inventory
```

### Mark Batch as Used
```bash
curl -X PUT \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "inventoryId": "507f...",
    "batchNumber": "BATCH-2024-001",
    "usedQuantity": 5
  }' \
  https://yourdomain.com/api/admin/inventory/batch
```

### Get Statistics
```bash
curl -H "Authorization: Bearer TOKEN" \
  https://yourdomain.com/api/admin/inventory/stats
```

---

## 🛠️ Troubleshooting

### Token Issues
**Problem**: "Unauthorized" error
**Solution**: 
- Clear localStorage
- Log out and log in again
- Check token expiration

### Data Not Loading
**Problem**: Empty dashboard
**Solution**:
- Wait for auto-refresh (30 seconds)
- Manually refresh browser
- Check internet connection
- Verify database connection

### Form Not Submitting
**Problem**: Add inventory form stuck
**Solution**:
- Check all required fields filled
- Verify expiry date > manufacturing date
- Ensure unique batch number
- Check browser console for errors

### Dates Not Validating
**Problem**: Expiry date validation fails
**Solution**:
- Ensure manufacturing date is BEFORE expiry date
- Use date picker (not manual typing)
- Dates should be in YYYY-MM-DD format

---

## 📈 Best Practices

### Batch Numbering
```
Format: BATCH-YYYY-MM-SEQUENCE

Examples:
BATCH-2024-01-001
BATCH-2024-01-002
BATCH-2024-02-001
```

### Location Management
```
Suggested Locations:
- Main Store
- Warehouse A
- Warehouse B
- Cold Storage
- Display Shelf
```

### Inventory Review
```
Recommended Schedule:
- Daily: Check low stock alerts
- Weekly: Review expiring batches
- Monthly: Full inventory audit
- Quarterly: Cleanup discontinued items
```

### Stock Threshold
```
General Guidelines:
- Ayurvedic Powders: 20-50 units
- Oils: 10-30 units
- Tablets/Capsules: 50-100 units
- Seasonal items: 5-10 units

Adjust based on:
- Sales velocity
- Storage capacity
- Shelf life
```

---

## 🔄 Workflow Example

### Complete Inventory Cycle
1. **Receive New Stock**
   - Go to "Add Inventory"
   - Enter product & batch details
   - Set manufacturing/expiry dates

2. **Monitor Stock**
   - Check dashboard daily
   - Watch for low stock alerts
   - Monitor expiring batches

3. **Use Stock**
   - Go to batch details
   - Select batch to use
   - Enter quantity used
   - System updates available stock

4. **Manage Expiry**
   - Review "Expiring Soon" alerts
   - Move expiring stock forward
   - Delete expired batches

5. **Generate Reports**
   - View statistics
   - Export data if needed
   - Plan future orders

---

## 🎯 Key Metrics to Monitor

### Daily
- [ ] Low stock items count
- [ ] Expiring batches
- [ ] Stock distribution

### Weekly
- [ ] Stock usage trends
- [ ] Batch rotation status
- [ ] Location capacity

### Monthly
- [ ] Overall inventory value
- [ ] Slow-moving items
- [ ] Shelf life compliance

---

## 📚 Documentation Files

Created documentation:
- `INVENTORY_MANAGEMENT.md` - Full API documentation
- `ADMIN_INVENTORY_PAGES.md` - UI/UX guide
- `QUICK_START.md` - This file

---

## 🆘 Support

### Check These First
1. Browser console (F12) for errors
2. Network tab for API issues
3. MongoDB connection status
4. JWT token validity

### Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 401 Unauthorized | Invalid token | Re-login |
| Batch not found | Wrong batch ID | Check ID exists |
| Expiry validation | Wrong date order | Manufacturing < Expiry |
| Stats not updating | Network issue | Refresh page |
| Page blank | Auth failed | Check localStorage |

---

## 🚀 Next Steps

1. ✅ Start using inventory dashboard
2. ✅ Add your first products
3. ✅ Set up locations
4. ✅ Create batch records
5. ✅ Monitor stock levels
6. ✅ Train team on system

---

## 📞 Need Help?

Check the documentation:
- API Details → `INVENTORY_MANAGEMENT.md`
- UI Components → `ADMIN_INVENTORY_PAGES.md`
- Error Messages → Browser Console
- Database Errors → Server Logs

---

**Version**: 1.0.0  
**Last Updated**: December 2024  
**Status**: ✅ Production Ready
