-- HTI Artwork Generator Database Schema
-- PostgreSQL 16+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    target_markets TEXT[] DEFAULT '{}',
    deadline DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'In Progress',
    compliance_status VARCHAR(50) DEFAULT 'Needs Review',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Designers table
CREATE TABLE IF NOT EXISTS designers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project-Designer assignment
CREATE TABLE IF NOT EXISTS project_designers (
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    designer_id UUID REFERENCES designers(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (project_id, designer_id)
);

-- Artwork files table
CREATE TABLE IF NOT EXISTS artwork_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    uploaded_by VARCHAR(255),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Warning templates table
CREATE TABLE IF NOT EXISTS warning_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    vector_symbol VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Warning translations table
CREATE TABLE IF NOT EXISTS warning_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    warning_id UUID REFERENCES warning_templates(id) ON DELETE CASCADE,
    language VARCHAR(100) NOT NULL,
    language_code VARCHAR(10) NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Translation orders table
CREATE TABLE IF NOT EXISTS translation_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_code VARCHAR(50) UNIQUE NOT NULL,
    project_id UUID REFERENCES projects(id),
    project_name VARCHAR(255) NOT NULL,
    agency VARCHAR(255) NOT NULL,
    target_languages TEXT[] DEFAULT '{}',
    status VARCHAR(50) DEFAULT 'Requested',
    requested_date DATE NOT NULL,
    delivery_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Translation items table
CREATE TABLE IF NOT EXISTS translation_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES translation_orders(id) ON DELETE CASCADE,
    item_type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    word_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_deadline ON projects(deadline);
CREATE INDEX IF NOT EXISTS idx_artwork_files_project ON artwork_files(project_id);
CREATE INDEX IF NOT EXISTS idx_warning_translations_warning ON warning_translations(warning_id);
CREATE INDEX IF NOT EXISTS idx_translation_orders_status ON translation_orders(status);

-- Sample designers
INSERT INTO designers (name, email) VALUES
    ('Sarah Miller', 'sarah.miller@hti-toys.com'),
    ('John Davis', 'john.davis@hti-toys.com'),
    ('Mike Roberts', 'mike.roberts@hti-toys.com')
ON CONFLICT (email) DO NOTHING;
