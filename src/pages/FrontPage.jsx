import { useNavigate } from 'react-router-dom';

export default function FrontPage() {
  const navigate = useNavigate();

  return (
    <div>
      <section style={{ textAlign: "center", padding: "60px 20px" }}>
        <h1>Welcome to Moto Parts Dashboard</h1>
        <p>Manage your inventory, track items, and keep everything organized in one place.</p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        <div 
          style={{ 
            background: "#fff", 
            padding: 20, 
            borderRadius: 8, 
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onClick={() => navigate('/dashboard/items')}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
          }}
        >
          <h3>📦 Manage Items</h3>
          <p>Add, edit, and delete items in your stock easily.</p>
        </div>
        
        <div style={{ 
            background: "#fff", 
            padding: 20, 
            borderRadius: 8, 
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onClick={() => navigate('/dashboard/items')}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
          }}>
          <h3>📊 Reports</h3>
          <p>View stock reports and check low stock alerts.</p>
        </div>
        
        <div style={{  
            background: "#fff", 
            padding: 20, 
            borderRadius: 8, 
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onClick={() => navigate('/dashboard/items')}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
          }}>
          <h3>☎️ Contact</h3>
          <p>Reach out to us for support anytime.</p>
        </div>
      </section>
    </div>
  );
}