import { useState, useContext, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Package, ShoppingCart,
    BarChart2, LogOut, Plus, Edit2, Trash2, Users, Menu, X, Eye
} from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import './Admin.css';

// Simple Login Component
function AdminLogin({ onLogin }) {
    // ... logic remains same ...
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'admin@crunchyho.com', password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                localStorage.setItem('adminInfo', JSON.stringify(data));
                onLogin();
            } else {
                alert(data.message || "Invalid credentials!");
            }
        } catch (error) {
            alert("Login failed. Check connection.");
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <h2>Admin Authentication</h2>
                <p className="text-muted">Enter password to access dashboard</p>
                <form onSubmit={handleLogin} className="admin-login-form">
                    <input
                        type="password"
                        placeholder="Admin Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="search-input"
                    />
                    <button type="submit" className="btn-primary w-full text-center">Login</button>
                </form>
                <div className="mt-4 text-center">
                    <Link to="/" className="text-muted">Return to Store</Link>
                </div>
            </div>
        </div>
    );
}

// Layout wrapper for Admin
function AdminLayout({ children, onLogout }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="admin-layout">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="admin-mobile-overlay" onClick={closeMobileMenu}></div>
            )}

            <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="admin-brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src="/logo1.jpeg" alt="CrunchyHo" style={{ height: '32px', objectFit: 'contain' }} />
                        <h2><span className="admin-badge">Admin</span></h2>
                    </div>
                    {/* Close button inside mobile menu */}
                    <button className="admin-mobile-close btn-action" onClick={closeMobileMenu}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="admin-nav">
                    <Link to="/admin" onClick={closeMobileMenu} className={`admin-nav-link ${currentPath === '/admin' ? 'active' : ''}`}>
                        <LayoutDashboard size={20} /> Dashboard
                    </Link>
                    <Link to="/admin/products" onClick={closeMobileMenu} className={`admin-nav-link ${currentPath === '/admin/products' ? 'active' : ''}`}>
                        <Package size={20} /> Products
                    </Link>
                    <Link to="/admin/orders" onClick={closeMobileMenu} className={`admin-nav-link ${currentPath === '/admin/orders' ? 'active' : ''}`}>
                        <ShoppingCart size={20} /> Orders
                    </Link>
                    <Link to="/admin/analytics" onClick={closeMobileMenu} className={`admin-nav-link ${currentPath === '/admin/analytics' ? 'active' : ''}`}>
                        <BarChart2 size={20} /> Analytics
                    </Link>
                    <Link to="/admin/users" onClick={closeMobileMenu} className={`admin-nav-link ${currentPath === '/admin/users' ? 'active' : ''}`}>
                        <Users size={20} /> Users
                    </Link>
                </nav>

                <div className="admin-sidebar-footer">
                    <button onClick={onLogout} className="admin-nav-link logout">
                        <LogOut size={20} /> Logout
                    </button>
                    <Link to="/" className="mt-4 text-sm text-muted">View Storefront</Link>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-header">
                    <div className="d-flex aligns-center gap-2">
                        <button className="admin-hamburger btn-action" onClick={toggleMobileMenu}>
                            <Menu size={24} color="#0f172a" />
                        </button>
                        <div className="admin-header-title">Admin Controller</div>
                    </div>
                    <div className="admin-profile">
                        <span className="admin-avatar">A</span>
                        SuperAdmin
                    </div>
                </header>
                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
}

// Sub-pages
function DashboardOverview() {
    const { products } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch orders
                const ordersRes = await fetch('/api/orders');
                const ordersData = await ordersRes.json();
                setOrders(ordersData);

                // Fetch total users if admin token is present
                const token = localStorage.getItem('adminToken');
                if (token) {
                    const usersRes = await fetch('/api/admin/users', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const usersData = await usersRes.json();
                    if (usersRes.ok) {
                        setTotalUsers(usersData.length);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            }
        };
        fetchData();
    }, []);

    // Only calculate sales and count for orders that are NOT cancelled
    const validOrders = orders.filter(order => order.orderStatus !== 'Cancelled');
    const totalSales = validOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const uniqueCustomers = new Set(orders.map(order => order.user.email)).size;

    return (
        <div className="animate-fade-in">
            <div className="d-flex justify-between aligns-center mb-4">
                <h2>Dashboard Overview</h2>
                <Link to="/admin/products" className="btn-primary d-flex gap-2" style={{ textDecoration: 'none', alignItems: 'center' }}>
                    <Plus size={18} /> Add New Product
                </Link>
            </div>
            <div className="dashboard-stats">
                <div className="stat-card"><h3>Total Sales</h3><p>₹{totalSales.toFixed(2)}</p></div>
                <div className="stat-card"><h3>Valid Orders</h3><p>{validOrders.length}</p></div>
                <div className="stat-card"><h3>Total Customers</h3><p>{totalUsers > 0 ? totalUsers : uniqueCustomers}</p></div>
                <div className="stat-card"><h3>Active Products</h3><p>{products.length}</p></div>
            </div>
        </div>
    );
}

// Helper to resolve product image URL
const resolveImageUrl = (img) => {
    if (!img) return '/images/sample.jpg';
    if (img.startsWith('/uploads')) {
        return `http://localhost:5000${img}`;
    }
    return img;
};

function ProductsManagement() {
    const { products, deleteProduct, addProduct, updateProduct } = useContext(ShopContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        imageFile: null,
        description: '',
        stockQuantity: '',
        rating: ''
    });

    const openAddModal = () => {
        setEditMode(false);
        setCurrentProductId(null);
        setProductForm({ name: '', price: '', category: '', image: '', imageFile: null, description: '', stockQuantity: '', rating: '' });
        setIsModalOpen(true);
    };

    const openEditModal = (product) => {
        setEditMode(true);
        setCurrentProductId(product._id || product.id);
        setProductForm({
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image, // Store the raw image path, not the resolved URL
            imageFile: null,
            description: product.description,
            stockQuantity: product.stockQuantity || 0,
            rating: product.rating || 0
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', productForm.name);
            formData.append('price', Number(productForm.price) || 0);
            formData.append('category', productForm.category || 'General');
            formData.append('description', productForm.description);
            formData.append('stockQuantity', Number(productForm.stockQuantity) || 0);
            formData.append('rating', Number(productForm.rating) || 0);

            if (productForm.imageFile) {
                formData.append('image', productForm.imageFile);
            } else if (productForm.image) {
                formData.append('image', productForm.image);
            } else if (!editMode) {
                // If it's a new product and no image is provided, send a placeholder or alert
                alert("Please upload an image or provide an image URL.");
                return;
            }

            if (editMode && currentProductId) {
                await updateProduct(currentProductId, formData);
            } else {
                await addProduct(formData);
            }

            setIsModalOpen(false);
            alert(`Product ${editMode ? 'updated' : 'added'} successfully!`);
        } catch (error) {
            console.error("Submit error:", error);
            alert("Error saving product: " + (error.message || "Unknown error"));
        }
    };

    const handleInputChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setProductForm({ ...productForm, imageFile: e.target.files[0] });
    };

    return (
        <div className="animate-fade-in relative">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', width: '100%' }}>
                <h2>Products Management</h2>
                <button type="button" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '0.95rem', boxShadow: '0 4px 10px rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={openAddModal}>
                    <Plus size={18} /> Add Product
                </button>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h3>{editMode ? 'Edit Product' : 'Add New Product'}</h3>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="form-group mb-3">
                                    <label>Product Name</label>
                                    <input type="text" name="name" className="search-input w-full" value={productForm.name} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Price (₹)</label>
                                    <input type="number" name="price" className="search-input w-full" value={productForm.price} onChange={handleInputChange} required min="0" step="0.01" />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Rating (0-5)</label>
                                    <input type="number" name="rating" className="search-input w-full" value={productForm.rating} onChange={handleInputChange} min="0" max="5" step="0.1" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Category</label>
                                    <input type="text" name="category" className="search-input w-full" value={productForm.category} onChange={handleInputChange} placeholder="e.g. Snacks, Sweets" required />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Image URL (Optional if uploading file)</label>
                                    <input type="text" name="image" className="search-input w-full" value={productForm.image} onChange={handleInputChange} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Upload Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        className="search-input w-full"
                                        onChange={handleFileChange}
                                        accept="image/png, image/jpeg, image/jpg"
                                    />
                                    {(productForm.image || productForm.imageFile) && (
                                        <div className="mt-2 text-center" style={{ border: '1px dashed #e2e8f0', padding: '10px', borderRadius: '8px' }}>
                                            <p className="text-sm text-muted mb-2">Image Preview:</p>
                                            <img
                                                src={productForm.imageFile ? URL.createObjectURL(productForm.imageFile) : resolveImageUrl(productForm.image)}
                                                alt="Preview"
                                                style={{ maxHeight: '150px', maxWidth: '100%', borderRadius: '8px', objectFit: 'contain' }}
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="form-group mb-3">
                                    <label>Stock Quantity</label>
                                    <input type="number" name="stockQuantity" className="search-input w-full" value={productForm.stockQuantity} onChange={handleInputChange} min="0" required />
                                </div>
                                <div className="form-group mb-4">
                                    <label>Description</label>
                                    <textarea name="description" className="search-input w-full" value={productForm.description} onChange={handleInputChange} required rows="3"></textarea>
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-save">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div >
            )}

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id || product.id}>
                                <td data-label="Image"><img src={resolveImageUrl(product.image)} alt={product.name} className="admin-product-thumb" /></td>
                                <td data-label="Name">{product.name}</td>
                                <td data-label="Stock">{product.stockQuantity || 0}</td>
                                <td data-label="Price">₹{product.price ? product.price.toFixed(2) : '0.00'}</td>
                                <td data-label="Actions">
                                    <div className="action-buttons">
                                        <button className="btn-action edit" title="Edit" onClick={() => openEditModal(product)}><Edit2 size={16} /> Edit</button>
                                        <button className="btn-action delete" title="Delete" onClick={() => deleteProduct(product._id || product.id)}><Trash2 size={16} /> Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

function CategoriesManagement() {
    const { products } = useContext(ShopContext);

    // Compute unique categories and their product counts
    const categoriesMap = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    const categories = Object.keys(categoriesMap).map(name => ({
        name,
        count: categoriesMap[name]
    }));

    return (
        <div className="animate-fade-in">
            <h2>Categories Management</h2>
            <p className="text-muted mb-4">Manage product categories logic. Categories are auto-generated based on active products.</p>

            <div className="dashboard-stats" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                {categories.map((cat, idx) => (
                    <div key={idx} className="stat-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem' }}>
                        <Tags size={32} className="mb-2" style={{ color: 'var(--primary-color)' }} />
                        <h3>{cat.name}</h3>
                        <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>{cat.count} Products</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function OrdersManagement() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/orders');
                const data = await res.json();
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };
        fetchOrders();
    }, []);

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`/api/orders/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                const data = await response.json();

                // Ensure we create a completely new array reference for React to detect the change
                setOrders(prevOrders => prevOrders.map(o => {
                    if (o._id === id) {
                        return { ...o, orderStatus: newStatus };
                    }
                    return o;
                }));

                alert(`Order status successfully saved as: ${newStatus}`);
            } else {
                alert('Failed to save order status!');
            }
        } catch (error) {
            console.error("Failed to update status", error);
            alert('Error updating status!');
        }
    };

    return (
        <div className="animate-fade-in relative">
            <h2>Orders Management</h2>

            {selectedOrder && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <h3>Order Details</h3>
                        <div className="admin-form">
                            <div className="mb-3">
                                <strong>Order ID:</strong> <span className="text-muted">{selectedOrder._id}</span>
                            </div>
                            <div className="mb-3" style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                <strong style={{ color: '#0f172a' }}>Customer Information</strong>
                                <div className="mt-2 text-sm text-muted" style={{ lineHeight: '1.6' }}>
                                    <p><strong>Name:</strong> {selectedOrder.user.fullName}</p>
                                    <p><strong>Phone:</strong> {selectedOrder.user.phone}</p>
                                    <p><strong>Address:</strong> {selectedOrder.user.address}, {selectedOrder.user.city}, {selectedOrder.user.state} - {selectedOrder.user.pincode}</p>
                                </div>
                            </div>

                            <div className="mb-3">
                                <strong style={{ color: '#0f172a' }}>Order Items</strong>
                                <div className="table-responsive mt-2">
                                    <table className="admin-table" style={{ fontSize: '0.85rem' }}>
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th>Qty</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedOrder.orderItems.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td data-label="Item" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <img src={resolveImageUrl(item.image)} alt={item.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '6px' }} />
                                                        <span>{item.name}</span>
                                                    </td>
                                                    <td data-label="Qty">x{item.qty}</td>
                                                    <td data-label="Price">₹{item.price.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="d-flex justify-between aligns-center mb-2 mt-4">
                                <span className="text-muted">Payment Method:</span>
                                <strong>{selectedOrder.paymentMethod}</strong>
                            </div>
                            <div className="d-flex justify-between aligns-center mb-4">
                                <span className="text-muted">Total Amount:</span>
                                <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>₹{selectedOrder.totalAmount.toFixed(2)}</span>
                            </div>

                            <div className="d-flex justify-end mt-4 w-full">
                                <button type="button" className="btn-secondary w-full" onClick={() => setSelectedOrder(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="table-responsive mt-4">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td data-label="Order ID">{order._id.substring(0, 8)}...</td>
                                <td data-label="Customer">{order.user.fullName}</td>
                                <td data-label="Total">₹{order.totalAmount.toFixed(2)}</td>
                                <td data-label="Payment">{order.paymentMethod}</td>
                                <td data-label="Status"><span className={`admin-badge-status ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</span></td>
                                <td data-label="Action">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end' }}>
                                        <button className="btn-action edit" title="View Details" onClick={() => setSelectedOrder(order)} style={{ padding: '0.4rem', borderRadius: '4px' }}>
                                            <Eye size={18} />
                                        </button>
                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className="search-input"
                                            style={{ padding: '0.4rem', width: 'auto', minWidth: '100px' }}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function UsersManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const res = await fetch('/api/admin/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setUsers(data);
                } else {
                    console.error("Failed to fetch users:", data.message);
                }
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="animate-fade-in">
            <h2>Users Management</h2>
            <div className="table-responsive mt-4">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td data-label="User ID">{user._id.substring(0, 8)}...</td>
                                <td data-label="Full Name">{user.fullName}</td>
                                <td data-label="Email">{user.email}</td>
                                <td data-label="Role">{user.role}</td>
                                <td data-label="Created At">{new Date(user.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            setIsAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminInfo');
        setIsAuthenticated(false);
    };

    if (loading) return <div className="admin-loading">Loading...</div>;

    if (!isAuthenticated) {
        return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <AdminLayout onLogout={handleLogout}>
            <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/products" element={<ProductsManagement />} />

                <Route path="/orders" element={<OrdersManagement />} />
                <Route path="/analytics" element={<DashboardOverview />} />
                <Route path="/users" element={<UsersManagement />} />
            </Routes>
        </AdminLayout>
    );
}
